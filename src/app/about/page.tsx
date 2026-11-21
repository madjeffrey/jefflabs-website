import React from "react";
import {
  Avatar,
  Button,
  Icon,
  IconButton,
  Media,
  Tag,
  Meta,
  Schema,
} from "@/components";
import { baseURL, about, person, social } from "@/resources";
import TableOfContents from "@/components/about/TableOfContents";

export async function generateMetadata() {
  return Meta.generate({
    title: about.title,
    description: about.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(about.title)}`,
    path: about.path,
  });
}

export default function About() {
  const structure = [
    {
      title: about.intro.title,
      display: about.intro.display,
      items: [],
    },
    {
      title: about.studies.title,
      display: about.studies.display,
      items: about.studies.institutions.map((institution) => institution.name),
    },
    {
      title: about.work.title,
      display: about.work.display,
      items: about.work.experiences.map((experience) => experience.company),
    },
    {
      title: about.technical.title,
      display: about.technical.display,
      items: about.technical.skills.map((skill) => skill.title),
    },
    ...(about.awards
      ? [
          {
            title: about.awards.title,
            display: about.awards.display,
            items: about.awards.items.map((award) => award.title),
          },
        ]
      : []),
  ];

  return (
    <div className="w-full max-w-7xl py-6 lg:pl-40 2xl:pl-16">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={about.title}
        description={about.description}
        path={about.path}
        image={`/api/og/generate?title=${encodeURIComponent(about.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />

      {about.tableOfContent.display && (
        <TableOfContents structure={structure} about={about} />
      )}

      <div className="flex w-full flex-col gap-10 md:flex-row md:items-start md:gap-10 lg:gap-12">
        {about.avatar.display && (
          <aside className="flex shrink-0 flex-col items-center gap-4 md:sticky md:top-24 md:w-44 lg:w-48">
            <Avatar
              src={person.avatar}
              size="xl"
              aria-label={person.name}
            />

            <div className="flex items-center gap-2 text-sm text-fg">
              <Icon name="globe" size="s" className="text-brand" />
              <span>{person.location}</span>
            </div>

            {person.languages && person.languages.length > 0 && (
              <div className="flex flex-wrap justify-center gap-2">
                {person.languages.map((language, index) => (
                  <Tag key={index} size="m">
                    {language}
                  </Tag>
                ))}
              </div>
            )}
          </aside>
        )}

        <div className="flex min-w-0 flex-1 flex-col gap-16">
          <section
            id={about.intro.title}
            className="flex flex-col items-center text-center md:items-start md:text-left"
          >
            {about.calendar.display && (
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border-brand bg-brand-soft p-1.5 pl-3.5 backdrop-blur-md">
                <Icon name="calendar" size="s" className="text-brand" />
                <span className="text-xs font-semibold text-fg px-1">
                  Schedule a technical chat
                </span>
                <IconButton
                  href={about.calendar.link}
                  variant="secondary"
                  size="s"
                  icon="chevronRight"
                  aria-label="Schedule a call"
                />
              </div>
            )}

            <h1 className="font-heading text-4xl sm:text-5xl font-bold tracking-tight text-fg">
              {person.name}
            </h1>
            <p className="mt-1.5 text-lg sm:text-xl font-normal text-fg-muted">
              {person.role}
            </p>

            {social.length > 0 && (
              <div className="mt-5 flex flex-wrap items-center justify-center gap-2 md:justify-start">
                {social
                  .filter((item) => item.essential)
                  .map(
                    (item) =>
                      item.link && (
                        <Button
                          key={item.name}
                          href={item.link}
                          prefixIcon={item.icon}
                          label={item.name}
                          size="s"
                          variant="secondary"
                        />
                      ),
                  )}
              </div>
            )}

            {about.intro.display && (
              <div className="mt-8 space-y-4 text-base leading-relaxed text-fg/85">
                {about.intro.description}
              </div>
            )}
          </section>

          {about.studies.display && (
            <section className="flex flex-col gap-6">
              <h2
                id={about.studies.title}
                className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-fg"
              >
                {about.studies.title}
              </h2>
              <div className="flex flex-col gap-7">
                {about.studies.institutions.map((institution, index) => (
                  <div key={`${institution.name}-${index}`}>
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3
                        id={institution.name}
                        className="font-heading text-lg sm:text-xl font-bold text-fg"
                      >
                        {institution.name}
                      </h3>
                      {institution.timeframe && (
                        <span className="text-sm text-fg-muted">{institution.timeframe}</span>
                      )}
                    </div>
                    {institution.degree && (
                      <div className="mt-0.5 text-sm text-brand">{institution.degree}</div>
                    )}
                    <div className="mt-1.5 text-sm sm:text-base leading-relaxed text-fg-muted">
                      {institution.description}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {about.work.display && (
            <section className="flex flex-col gap-6">
              <h2
                id={about.work.title}
                className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-fg"
              >
                {about.work.title}
              </h2>
              <div className="flex flex-col gap-10">
                {about.work.experiences.map((experience, index) => (
                  <div key={`${experience.company}-${experience.role}-${index}`}>
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3
                        id={experience.company}
                        className="font-heading text-lg sm:text-xl font-bold text-fg"
                      >
                        {experience.company}
                      </h3>
                      <span className="text-sm text-fg-muted">{experience.timeframe}</span>
                    </div>
                    <div className="mt-0.5 text-sm text-brand">{experience.role}</div>
                    <ul className="mt-4 list-disc space-y-3 pl-5 text-sm sm:text-base leading-relaxed text-fg/85 marker:text-fg-muted">
                      {experience.achievements.map((achievement, idx) => (
                        <li key={`${experience.company}-${idx}`}>{achievement}</li>
                      ))}
                    </ul>
                    {experience.images && experience.images.length > 0 && (
                      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                        {experience.images.map((image, idx) => (
                          <Media
                            key={idx}
                            enlarge
                            aspectRatio="16 / 9"
                            alt={image.alt}
                            src={image.src}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {about.technical.display && (
            <section className="flex flex-col gap-6">
              <h2
                id={about.technical.title}
                className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-fg"
              >
                {about.technical.title}
              </h2>
              <div className="flex flex-col gap-8">
                {about.technical.skills.map((skill, index) => (
                  <div key={`${skill.title}-${index}`}>
                    <h3
                      id={skill.title}
                      className="font-heading text-lg sm:text-xl font-bold text-fg"
                    >
                      {skill.title}
                    </h3>
                    {skill.description && (
                      <div className="mt-1.5 text-sm sm:text-base leading-relaxed text-fg-muted">
                        {skill.description}
                      </div>
                    )}
                    {skill.tags && skill.tags.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {skill.tags.map((tag, tagIndex) => (
                          <Tag
                            key={`${skill.title}-${tagIndex}`}
                            size="m"
                            prefixIcon={tag.icon}
                            variant="neutral"
                          >
                            {tag.name}
                          </Tag>
                        ))}
                      </div>
                    )}
                    {skill.images && skill.images.length > 0 && (
                      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                        {skill.images.map((image, idx) => (
                          <Media
                            key={idx}
                            enlarge
                            aspectRatio="16 / 9"
                            alt={image.alt}
                            src={image.src}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {about.awards?.display && (
            <section className="flex flex-col gap-6">
              <h2
                id={about.awards.title}
                className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-fg"
              >
                {about.awards.title}
              </h2>
              <div className="flex flex-col gap-7">
                {about.awards.items.map((award, index) => (
                  <div key={`${award.title}-${index}`}>
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3
                        id={award.title}
                        className="font-heading text-lg sm:text-xl font-bold text-fg"
                      >
                        {award.title}
                      </h3>
                      {award.date && (
                        <span className="text-sm text-fg-muted">{award.date}</span>
                      )}
                    </div>
                    {award.issuer && (
                      <div className="mt-0.5 text-sm text-brand">{award.issuer}</div>
                    )}
                    {award.description && (
                      <div className="mt-1.5 text-sm sm:text-base leading-relaxed text-fg-muted">
                        {award.description}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
