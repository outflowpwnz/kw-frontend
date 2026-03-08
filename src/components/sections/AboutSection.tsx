import Image from 'next/image'
import { Container, Section, MarkerHeading, FadeUp } from '@/components/ui'

const TEAM = [
  { name: 'Екатерина Карпенко', role: 'Основатель & ведущий организатор', photo: '/images/wedding-planners/wedding-planner-ekaterina.jpg' },
  { name: 'Александра',         role: 'Организатор',                       photo: '/images/wedding-planners/wedding-planner-alexandra.jpg' },
  { name: 'Алина',              role: 'Организатор',                       photo: '/images/wedding-planners/wedding-planner-alina.jpg' },
  { name: 'Мария',              role: 'Координатор',                       photo: '/images/wedding-planners/wedding-planner-maria.jpg' },
]

export function AboutSection() {
  return (
    <Section id="about">
      <Container>
        <MarkerHeading
          as="h2"
          className="text-3xl md:text-4xl lg:text-5xl mb-12"
          highlight={['АТЕЛЬЕ СОБЫТИЙ']}
          markerDelay={400}
        >
          КТО МЫ? АТЕЛЬЕ СОБЫТИЙ ЕКАТЕРИНЫ КАРПЕНКО
        </MarkerHeading>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {TEAM.map((member, i) => (
            <FadeUp key={i} delay={i * 100}>
              <div className="flex flex-col">
                <div className="relative aspect-[3/4] mb-4 overflow-hidden">
                  <Image
                    src={member.photo}
                    alt={member.name}
                    fill
                    className="object-cover object-top"
                  />
                </div>
                <p className="font-bold text-[var(--color-dark)] text-sm md:text-base">{member.name}</p>
                <p className="text-sm mt-1">
                  <mark className="marker-highlight is-visible bg-transparent text-[var(--color-dark)]">
                    {member.role}
                  </mark>
                </p>
              </div>
            </FadeUp>
          ))}
        </div>
      </Container>
    </Section>
  )
}
