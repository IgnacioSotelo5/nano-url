import { Bar, Line } from 'react-chartjs-2'
import { Chart as ChartJs, CategoryScale, LinearScale, BarElement, LineElement, Title, Tooltip, Legend, ChartData, ChartOptions } from 'chart.js'
import { _DeepPartialObject } from 'node_modules/chart.js/dist/types/utils'

ChartJs.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

interface ClicksMetricsProps {
  data: ChartData<'bar'>
  options: ChartOptions<'bar'>
}

export function ClicksMetrics ({ data, options }: ClicksMetricsProps) {
  return <Bar options={options} data={data} />
}
