import { Container, Section, MarkerHeading, FadeUp } from '@/components/ui'

interface Step {
  title: string
  desc: string
}

const STEPS: Step[] = [
  {
    title: 'Заполнение анкеты',
    desc: 'Вы заполняете анкету, на основе которой мы составляем для вас предварительную смету, узнаем базу ваших предпочтений, после чего назначаем первую встречу.',
  },
  {
    title: 'Первая встреча-знакомство',
    desc: 'Первая встреча абсолютно бесплатная, ни к чему не обязывающая. Мы знакомимся, обсуждаем ваши пожелания, рассказываем про работу организатора и подробно разбираем предварительную смету свадьбы.',
  },
  {
    title: 'Подписание договора',
    desc: 'Если вам откликается наш подход к процессу подготовки свадьбы — мы подписываем договор.',
  },
  {
    title: 'Создание чата',
    desc: 'Сразу после подписания договора мы создаем общий чат в удобной для вас социальной сети.',
  },
  {
    title: 'Процесс подготовки',
    desc: 'Приступаем к реализации вашего свадебного дня.',
  },
]

export function ProcessSection() {
  return (
    <Section id="process" className="bg-gray-50">
      <Container>
        <MarkerHeading
          as="h2"
          className="text-3xl md:text-4xl lg:text-5xl mb-12"
          highlight={['КАК МЫ РАБОТАЕМ']}
          markerDelay={400}
        >
          КАК МЫ РАБОТАЕМ
        </MarkerHeading>

        <div className="flex flex-col md:flex-row gap-6 md:gap-4">
          {STEPS.map((step, i) => (
            <FadeUp key={i} delay={i * 100} className="flex-1">
              <div className="flex flex-col md:items-start gap-3 h-full">
                <span className="text-2xl font-bold" style={{ color: 'var(--color-orange)' }}>
                  ({i + 1})
                </span>
                <div className="hidden md:block w-full h-px bg-gray-300 my-1" />
                <h3 className="font-bold text-[var(--color-dark)] text-base uppercase">{step.title}</h3>
                <p className="text-[var(--color-muted)] text-sm leading-relaxed">{step.desc}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </Container>
    </Section>
  )
}
