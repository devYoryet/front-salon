// src/util/useNotificationWebsoket.jsx
import { useEffect, useState } from 'react'
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import { addNotification } from '../Redux/Notifications/action';
import { useDispatch } from 'react-redux';

const useNotificationWebsoket = (userId, type) => {
    const dispatch = useDispatch();
    const [stompClient, setStompClient] = useState(null);
    const [connected, setConnected] = useState(false);

    useEffect(() => {
        if (!userId) {
            console.log("No userId provided, skipping WebSocket connection");
            return;
        }

        console.log("Inicializando WebSocket para usuario:", userId, "tipo:", type);

        try {
            // Crear conexión SockJS
            const socket = new SockJS('http://localhost:8081/api/notifications/ws');
            const client = Stomp.over(socket);

            // Configurar cliente
            client.reconnectDelay = 5000;
            client.heartbeatIncoming = 4000;
            client.heartbeatOutgoing = 4000;

            // Conectar
            client.connect(
                {},
                (frame) => {
                    console.log('WebSocket conectado:', frame);
                    setConnected(true);
                    setStompClient(client);

                    // Suscribirse al canal apropiado
                    const destination = type === "user" 
                        ? `/topic/user/${userId}` 
                        : `/topic/salon/${userId}`;

                    client.subscribe(destination, (message) => {
                        console.log('Notificación recibida:', message.body);
                        try {
                            const notification = JSON.parse(message.body);
                            dispatch(addNotification(notification));
                            
                            // Mostrar notificación del navegador si está permitido
                            if (Notification.permission === 'granted') {
                                new Notification('Nueva notificación', {
                                    body: notification.description,
                                    icon: '/favicon.ico'
                                });
                            }
                        } catch (error) {
                            console.error('Error al procesar notificación:', error);
                        }
                    });

                    console.log(`Suscrito a: ${destination}`);
                },
                (error) => {
                    console.error('Error de WebSocket:', error);
                    setConnected(false);
                }
            );

            // Cleanup al desmontar
            return () => {
                if (client && client.connected) {
                    console.log('Desconectando WebSocket');
                    client.disconnect();
                    setConnected(false);
                    setStompClient(null);
                }
            };
        } catch (error) {
            console.error('Error al inicializar WebSocket:', error);
            setConnected(false);
        }
    }, [userId, type, dispatch]);

    // Solicitar permisos de notificación del navegador
    useEffect(() => {
        if (typeof Notification !== 'undefined' && Notification.permission === 'default') {
            Notification.requestPermission();
        }
    }, []);

    return { connected, stompClient };
};

export default useNotificationWebsoket;

