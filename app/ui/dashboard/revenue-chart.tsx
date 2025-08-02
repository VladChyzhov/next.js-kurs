import { generateYAxis } from '@/app/lib/utils';
import { CalendarIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import { fetchRevenue } from '@/app/lib/data';

// Этот компонент только для представления.
// Для UI визуализации данных см.:
// https://www.tremor.so/
// https://www.chartjs.org/
// https://airbnb.io/visx/

// Функция для получения Tailwind класса высоты
function getHeightClass(height: number): string {
  if (height <= 10) return 'h-2';
  if (height <= 20) return 'h-4';
  if (height <= 30) return 'h-6';
  if (height <= 40) return 'h-8';
  if (height <= 50) return 'h-10';
  if (height <= 60) return 'h-12';
  if (height <= 70) return 'h-14';
  if (height <= 80) return 'h-16';
  if (height <= 90) return 'h-18';
  if (height <= 100) return 'h-20';
  if (height <= 120) return 'h-24';
  if (height <= 140) return 'h-28';
  if (height <= 160) return 'h-32';
  if (height <= 180) return 'h-36';
  if (height <= 200) return 'h-40';
  if (height <= 250) return 'h-48';
  if (height <= 300) return 'h-56';
  return 'h-64';
}

export default async function RevenueChart() {
  let revenue: { month: string; revenue: number }[] = [];
  let error: string | null = null;

  try {
    const data = await fetchRevenue();
    if (Array.isArray(data)) {
      revenue = data
        .filter(
          (item) =>
            item &&
            typeof item.month === 'string' &&
            typeof item.revenue === 'number' &&
            !isNaN(item.revenue)
        )
        .map((item) => ({
          month: item.month,
          revenue: item.revenue,
        }));
    } else {
      error = 'Некорректный формат данных.';
    }
  } catch (e) {
    error = 'Не удалось загрузить данные о доходах.';
  }

  const chartHeight = 350;

  if (error) {
    return (
      <p className="mt-4 text-red-400">
        {error}
      </p>
    );
  }

  if (!Array.isArray(revenue) || revenue.length === 0) {
    return (
      <p className="mt-4 text-gray-400">
        Нет доступных данных.
      </p>
    );
  }

  let yAxisLabels: string[] = [];
  let topLabel: number = 0;
  try {
    const yAxis = generateYAxis(revenue);
    yAxisLabels = yAxis.yAxisLabels;
    topLabel = yAxis.topLabel;
  } catch (e) {
    return (
      <p className="mt-4 text-gray-400">
        Ошибка при генерации оси Y.
      </p>
    );
  }

  if (!topLabel || topLabel <= 0) {
    return (
      <p className="mt-4 text-gray-400">
        Недостаточно данных для построения графика.
      </p>
    );
  }

  return (
    <div className="w-full md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Доход за последние месяцы
      </h2>

      <div className="rounded-xl bg-gray-50 p-4">
        <div className="sm:grid-cols-13 mt-0 grid grid-cols-12 items-end gap-2 rounded-md bg-white p-4 md:gap-4">
                     <div
             className="mb-6 hidden flex-col justify-between text-sm text-gray-400 sm:flex h-[350px]"
           >
            {yAxisLabels.map((label) => (
              <p key={label}>{label}</p>
            ))}
          </div>

                     {revenue.map((month) => {
             const rawHeight = (chartHeight / topLabel) * month.revenue;
             const barHeight = Math.max(2, Math.min(chartHeight, Math.round(rawHeight)));

             return (
               <div key={month.month} className="flex flex-col items-center gap-2">
                                   <div
                    className={`w-full rounded-md bg-blue-300 min-h-2 transition-all duration-300 ${getHeightClass(barHeight)}`}
                    title={`Доход: ${month.revenue}`}
                  ></div>
                 <p className="-rotate-90 text-sm text-gray-400 sm:rotate-0">
                   {month.month}
                 </p>
               </div>
             );
           })}
        </div>
        <div className="flex items-center pb-2 pt-6">
          <CalendarIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500 ">Последние 12 месяцев</h3>
        </div>
      </div>
    </div>
  );
}
