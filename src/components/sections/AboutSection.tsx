import Image from 'next/image'
import { Container, Section, MarkerHeading, FadeUp } from '@/components/ui'
import { resolveMediaUrl } from '@/lib/api'
import type { TeamMember } from '@/lib/api'

interface Props {
  team: TeamMember[]
}

export function AboutSection({ team }: Props) {
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
          {team.map((member, i) => (
            <FadeUp key={member.id} delay={i * 100}>
              <div className="flex flex-col">
                <div className="relative aspect-[3/4] mb-4 overflow-hidden">
                  <Image
                    src={resolveMediaUrl(member.photoUrl)}
                    alt={member.name}
                    fill
                    className="object-cover object-top"
                    unoptimized
                  />
                </div>
                <p className="font-bold text-[var(--color-dark)] text-sm md:text-base">{member.name}</p>
                <p className="text-sm mt-1">
                  <mark className="marker-highlight is-visible bg-transparent text-[var(--color-dark)]">
                    {member.description}
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
