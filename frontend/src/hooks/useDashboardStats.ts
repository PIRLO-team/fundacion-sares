// React
import { useState } from 'react';

// API Axios Call
import { projectApi } from '@/api';

// Sonner Notifications
import { toast } from 'sonner';

export const useDashboardStats = () => {
  const [dashboardStats, setDashboardStats] = useState({
    expiredSupplyData: [],
    nonConsumableData: [],
    supplyCategoryData: [],
    userCount: [],
    volunteerCount: 0,
  });

  const [loading, setLoading] = useState(false);

  const onSetDashboardStats = async () => {
    setLoading(true);

    try {
      const { data } = await projectApi.get('/api/dashboard');

      setDashboardStats(data.response);

      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      const errData = error.response.data;
      toast.error(errData.message);
    }
  };

  return {
    // States
    dashboardStats,
    loading,

    // Methods
    onSetDashboardStats,
  };
};
