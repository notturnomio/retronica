import { instance } from 'api/api.interceptor';
import { TypeStatisticsResponse } from 'types/statistics.interface';

const STATISTICS = 'statistics';

const StatisticService = {
  async getMain() {
    return instance<TypeStatisticsResponse[]>({
      url: `${STATISTICS}/main`,
      method: 'GET'
    });
  }
};

export default StatisticService;
