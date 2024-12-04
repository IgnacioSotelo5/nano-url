import { ReactNode } from "react"

interface AnalyticsProps{
  charts: ReactNode[]
}
export function AnalyticsContainer ({ charts }: AnalyticsProps) {
  return (
        <section className='w-full h-full border-solid rounded-sm bg-zinc-600/25 flex flex-col items-center'>
            {
              charts.map((chart, index) => (
               <div key={`chart-${index}`}>
                  {chart}
               </div>
              ))
            }
        </section>
  )
}
