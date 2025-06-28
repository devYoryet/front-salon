import React, { useEffect } from "react";
import ReportCard from "./Report/ReportCard";
import {
  Box,
  Grid2,
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Chip,
  Paper,
} from "@mui/material";
import EarningCharts from "./Chart/EarningCharts";
import BookingCharts from "./Chart/BookingChart";
import { useSelector } from "react-redux";
import {
  AccountBalanceWallet,
  CalendarToday,
  TrendingUp,
  Cancel,
  People,
  AttachMoney,
  Schedule,
  Star,
} from "@mui/icons-material";

const HomePage = () => {
  const { booking, salon } = useSelector((store) => store);

  // Datos de ejemplo para mostrar el potencial
  const mockStats = {
    todayBookings: 12,
    todayEarnings: 450000,
    weeklyGrowth: 15.5,
    monthlyBookings: 245,
    avgRating: 4.8,
    completionRate: 92,
    topServices: [
      { name: "Corte de Pelo", bookings: 45, revenue: 675000 },
      { name: "Manicure", bookings: 32, revenue: 480000 },
      { name: "Tratamiento Facial", bookings: 28, revenue: 840000 },
    ],
    recentBookings: [
      { 
        id: 1, 
        customer: "María González", 
        service: "Corte + Peinado", 
        time: "10:00", 
        status: "confirmado",
        amount: 35000 
      },
      { 
        id: 2, 
        customer: "Ana López", 
        service: "Manicure", 
        time: "11:30", 
        status: "en_proceso",
        amount: 25000 
      },
      { 
        id: 3, 
        customer: "Carolina Silva", 
        service: "Tratamiento Facial", 
        time: "14:00", 
        status: "pendiente",
        amount: 50000 
      },
    ],
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmado": return "success";
      case "en_proceso": return "info";
      case "pendiente": return "warning";
      case "cancelado": return "error";
      default: return "default";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "confirmado": return "Confirmado";
      case "en_proceso": return "En Proceso";
      case "pendiente": return "Pendiente";
      case "cancelado": return "Cancelado";
      default: return status;
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
    }).format(amount);
  };

  return (
    <div className="space-y-6 p-4">
      {/* Header */}
      <div className="mb-8">
        <Typography variant="h3" className="font-bold text-primary mb-2">
          Panel de Control - {salon.salon?.name || "Mi Salón"}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Gestiona tu negocio de belleza de manera eficiente
        </Typography>
      </div>

      {/* Tarjetas de estadísticas principales */}
      <Grid2 container spacing={3} className="mb-6">
        <Grid2 xs={12} sm={6} md={3}>
          <ReportCard
            icon={<CalendarToday />}
            value={mockStats.todayBookings}
            title="Citas Hoy"
            subtitle="Reservas confirmadas"
            color="#1B4332"
          />
        </Grid2>
        <Grid2 xs={12} sm={6} md={3}>
          <ReportCard
            icon={<AttachMoney />}
            value={formatCurrency(mockStats.todayEarnings)}
            title="Ingresos Hoy"
            subtitle="Ventas del día"
            color="#2D5A3D"
          />
        </Grid2>
        <Grid2 xs={12} sm={6} md={3}>
          <ReportCard
            icon={<TrendingUp />}
            value={`+${mockStats.weeklyGrowth}%`}
            title="Crecimiento Semanal"
            subtitle="Comparado con la semana anterior"
            color="#40916C"
          />
        </Grid2>
        <Grid2 xs={12} sm={6} md={3}>
          <ReportCard
            icon={<Star />}
            value={mockStats.avgRating}
            title="Calificación Promedio"
            subtitle="Basado en reseñas de clientes"
            color="#52B788"
          />
        </Grid2>
      </Grid2>

      {/* Gráficos principales */}
      <Grid2 container spacing={3} className="mb-6">
        <Grid2 xs={12} lg={8}>
          <Card className="h-full">
            <CardContent>
              <Typography variant="h6" className="font-semibold mb-4 text-primary">
                📈 Ingresos Mensuales
              </Typography>
              <div className="h-80">
                <EarningCharts />
              </div>
            </CardContent>
          </Card>
        </Grid2>
        <Grid2 xs={12} lg={4}>
          <Card className="h-full">
            <CardContent>
              <Typography variant="h6" className="font-semibold mb-4 text-primary">
                📊 Servicios Más Populares
              </Typography>
              <div className="space-y-4">
                {mockStats.topServices.map((service, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Typography variant="body2" className="font-medium">
                        {service.name}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {service.bookings} citas
                      </Typography>
                    </div>
                    <LinearProgress
                      variant="determinate"
                      value={(service.bookings / 50) * 100}
                      sx={{
                        height: 8,
                        borderRadius: 4,
                        backgroundColor: "#E8F5E8",
                        "& .MuiLinearProgress-bar": {
                          borderRadius: 4,
                          background: `linear-gradient(45deg, #1B4332, #40916C)`,
                        },
                      }}
                    />
                    <Typography variant="caption" color="textSecondary">
                      {formatCurrency(service.revenue)} en ingresos
                    </Typography>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </Grid2>
      </Grid2>

      {/* Estadísticas adicionales */}
      <Grid2 container spacing={3} className="mb-6">
        <Grid2 xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" className="font-semibold mb-4 text-primary">
                📅 Citas de Hoy
              </Typography>
              <div className="space-y-3">
                {mockStats.recentBookings.map((booking) => (
                  <Paper key={booking.id} className="p-3 border-l-4 border-l-primary">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <Typography variant="body1" className="font-medium">
                          {booking.customer}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {booking.service} • {booking.time}
                        </Typography>
                        <Typography variant="body2" className="font-semibold text-primary">
                          {formatCurrency(booking.amount)}
                        </Typography>
                      </div>
                      <Chip
                        label={getStatusText(booking.status)}
                        color={getStatusColor(booking.status)}
                        size="small"
                      />
                    </div>
                  </Paper>
                ))}
              </div>
            </CardContent>
          </Card>
        </Grid2>
        <Grid2 xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" className="font-semibold mb-4 text-primary">
                📈 Reservas del Mes
              </Typography>
              <div className="h-64">
                <BookingCharts />
              </div>
            </CardContent>
          </Card>
        </Grid2>
      </Grid2>

      {/* Métricas de rendimiento */}
      <Grid2 container spacing={3}>
        <Grid2 xs={12} md={4}>
          <Card>
            <CardContent className="text-center">
              <People className="text-primary" style={{ fontSize: 48 }} />
              <Typography variant="h4" className="font-bold text-primary mt-2">
                {mockStats.monthlyBookings}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                Clientes Este Mes
              </Typography>
            </CardContent>
          </Card>
        </Grid2>
        <Grid2 xs={12} md={4}>
          <Card>
            <CardContent className="text-center">
              <Schedule className="text-secondary" style={{ fontSize: 48 }} />
              <Typography variant="h4" className="font-bold text-primary mt-2">
                {mockStats.completionRate}%
              </Typography>
              <Typography variant="body1" color="textSecondary">
                Tasa de Finalización
              </Typography>
            </CardContent>
          </Card>
        </Grid2>
        <Grid2 xs={12} md={4}>
          <Card>
            <CardContent className="text-center">
              <AccountBalanceWallet className="text-success" style={{ fontSize: 48 }} />
              <Typography variant="h4" className="font-bold text-primary mt-2">
                {formatCurrency(booking.report?.totalEarnings || 2580000)}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                Ingresos Totales
              </Typography>
            </CardContent>
          </Card>
        </Grid2>
      </Grid2>
    </div>
  );
};

export default HomePage;