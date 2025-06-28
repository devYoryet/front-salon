import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Chip,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  Avatar,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSalonBookings,
  updateBookingStatus,
} from "../../../Redux/Booking/action";
import {
  Person,
  Schedule,
  AttachMoney,
  Phone,
  Email,
} from "@mui/icons-material";

const BookingTable = () => {
  const { booking } = useSelector((store) => store);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchSalonBookings({ jwt: localStorage.getItem("jwt") }));
  }, [dispatch]);

  const handleUpdateStatus = (bookingId, newStatus) => () => {
    dispatch(
      updateBookingStatus({
        bookingId,
        status: newStatus,
        jwt: localStorage.getItem("jwt"),
      })
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "CONFIRMED": return "success";
      case "PENDING": return "warning";
      case "CANCELLED": return "error";
      case "COMPLETED": return "info";
      default: return "default";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "CONFIRMED": return "Confirmada";
      case "PENDING": return "Pendiente";
      case "CANCELLED": return "Cancelada";
      case "COMPLETED": return "Completada";
      default: return status;
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-CL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('es-CL', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (!booking.bookings || booking.bookings.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-12">
          <Schedule sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6" color="textSecondary">
            No hay reservas disponibles
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Las nuevas reservas aparecerán aquí
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <Typography variant="h4" className="font-bold text-primary">
            Gestión de Reservas
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Administra las citas de tu salón
          </Typography>
        </div>
        <Box className="flex gap-2">
          <Chip 
            label={`${booking.bookings.length} reservas total`}
            color="primary" 
            variant="outlined"
          />
        </Box>
      </div>

      {/* Estadísticas rápidas */}
      <Grid container spacing={3} className="mb-6">
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent className="text-center">
              <Typography variant="h6" color="success.main">
                {booking.bookings.filter(b => b.status === 'CONFIRMED').length}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Confirmadas
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent className="text-center">
              <Typography variant="h6" color="warning.main">
                {booking.bookings.filter(b => b.status === 'PENDING').length}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Pendientes
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent className="text-center">
              <Typography variant="h6" color="info.main">
                {booking.bookings.filter(b => b.status === 'COMPLETED').length}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Completadas
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent className="text-center">
              <Typography variant="h6" color="primary.main">
                {formatCurrency(booking.bookings.reduce((sum, b) => sum + (b.totalPrice || 0), 0))}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Ingresos Total
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Tabla de reservas */}
      <Card>
        <TableContainer component={Paper} elevation={0}>
          <Table sx={{ minWidth: 700 }}>
            <TableHead>
              <TableRow sx={{ backgroundColor: 'primary.main' }}>
                <TableCell sx={{ color: 'white', fontWeight: 600 }}>
                  Cliente
                </TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 600 }}>
                  Servicios
                </TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 600 }}>
                  Fecha y Hora
                </TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 600 }}>
                  Monto
                </TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 600 }}>
                  Estado
                </TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 600 }} align="right">
                  Acciones
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {booking.bookings.map((item) => (
                <TableRow 
                  key={item.id}
                  sx={{ 
                    '&:hover': { backgroundColor: 'action.hover' },
                    '&:nth-of-type(odd)': { backgroundColor: 'action.hover' }
                  }}
                >
                  {/* Cliente */}
                  <TableCell>
                    <Box className="flex items-center gap-3">
                      <Avatar sx={{ bgcolor: 'primary.main' }}>
                        {item.customer?.fullName?.[0]?.toUpperCase() || 'C'}
                      </Avatar>
                      <div>
                        <Typography variant="body1" className="font-medium">
                          {item.customer?.fullName || 'Cliente'}
                        </Typography>
                        <Box className="flex items-center gap-1 text-gray-600">
                          <Email sx={{ fontSize: 14 }} />
                          <Typography variant="caption">
                            {item.customer?.email || 'N/A'}
                          </Typography>
                        </Box>
                        {item.customer?.phone && (
                          <Box className="flex items-center gap-1 text-gray-600">
                            <Phone sx={{ fontSize: 14 }} />
                            <Typography variant="caption">
                              {item.customer.phone}
                            </Typography>
                          </Box>
                        )}
                      </div>
                    </Box>
                  </TableCell>

                  {/* Servicios */}
                  <TableCell>
                    <div className="space-y-1">
                      {item.services?.map((service, index) => (
                        <Chip
                          key={index}
                          label={service.name}
                          size="small"
                          variant="outlined"
                          color="primary"
                        />
                      )) || <Typography variant="body2">No especificado</Typography>}
                    </div>
                  </TableCell>

                  {/* Fecha y Hora */}
                  <TableCell>
                    <div className="space-y-1">
                      <Typography variant="body2" className="font-medium">
                        📅 {formatDate(item.startTime)}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        🕐 {formatTime(item.startTime)}
                        {item.endTime && ` - ${formatTime(item.endTime)}`}
                      </Typography>
                    </div>
                  </TableCell>

                  {/* Monto */}
                  <TableCell>
                    <Typography variant="body1" className="font-semibold text-primary">
                      {formatCurrency(item.totalPrice || 0)}
                    </Typography>
                  </TableCell>

                  {/* Estado */}
                  <TableCell>
                    <Chip
                      label={getStatusText(item.status)}
                      color={getStatusColor(item.status)}
                      size="small"
                    />
                  </TableCell>

                  {/* Acciones */}
                  <TableCell align="right">
                    <div className="flex gap-1 justify-end">
                      {item.status === "PENDING" && (
                        <>
                          <Button
                            onClick={handleUpdateStatus(item.id, "CONFIRMED")}
                            size="small"
                            variant="contained"
                            color="success"
                          >
                            Confirmar
                          </Button>
                          <Button
                            onClick={handleUpdateStatus(item.id, "CANCELLED")}
                            size="small"
                            variant="outlined"
                            color="error"
                          >
                            Cancelar
                          </Button>
                        </>
                      )}
                      {item.status === "CONFIRMED" && (
                        <>
                          <Button
                            onClick={handleUpdateStatus(item.id, "COMPLETED")}
                            size="small"
                            variant="contained"
                            color="info"
                          >
                            Completar
                          </Button>
                          <Button
                            onClick={handleUpdateStatus(item.id, "CANCELLED")}
                            size="small"
                            variant="outlined"
                            color="error"
                          >
                            Cancelar
                          </Button>
                        </>
                      )}
                      {item.status === "CANCELLED" && (
                        <Chip label="Cancelada" color="error" size="small" />
                      )}
                      {item.status === "COMPLETED" && (
                        <Chip label="Finalizada" color="info" size="small" />
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </div>
  );
};

export default BookingTable;