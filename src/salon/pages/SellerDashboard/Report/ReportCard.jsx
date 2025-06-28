import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

const ReportCard = ({ value, title, subtitle, icon, color = "#1B4332" }) => {
  return (
    <Card 
      sx={{
        background: `linear-gradient(135deg, ${color} 0%, ${color}DD 100%)`,
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
        height: '140px',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: '-50%',
          right: '-20%',
          width: '120%',
          height: '120%',
          background: `radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)`,
          borderRadius: '50%',
        },
        '&:hover': {
          transform: 'translateY(-4px)',
          transition: 'transform 0.3s ease',
          boxShadow: `0 8px 25px ${color}33`,
        },
      }}
    >
      <CardContent sx={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
              {value}
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.9, fontWeight: 500 }}>
              {title}
            </Typography>
          </Box>
          <Box sx={{ 
            backgroundColor: 'rgba(255,255,255,0.15)', 
            borderRadius: '12px', 
            p: 1.5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {React.cloneElement(icon, { style: { fontSize: 32 } })}
          </Box>
        </Box>
        {subtitle && (
          <Typography variant="body2" sx={{ opacity: 0.8, mt: 1 }}>
            {subtitle}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default ReportCard;