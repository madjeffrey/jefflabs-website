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
      title: about.work.title,
      display: about.work.display,
      items: about.work.experiences.map((experience) => experience.company),
    },
    {
      title: about.studies.title,
      display: about.studies.display,
      items: about.studies.institutions.map((institution) => institution.name),
    },
    {
      title: about.technical.title,
      display: about.technical.display,
      items: about.technical.skills.map((skill) => skill.title),
    },
  ];

  return (
    <div className="w-full max-w-4xl py-6">
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

      <div className="flex w-full flex-col gap-12 md:flex-row md:items-start">
        {about.avatar.display && (
          <aside className="flex flex-col items-center gap-5 md:sticky md:top-24 md:w-1/3">
            <div className="relative">
              <Avatar src={person.avatar} size="xl" aria-label={person.name} />
              <span
                title="Volleyball & AI Lab"
                className="absolute bottom-1 right-1 flex h-9 w-9 items-center justify-center rounded-full border-2 border-page bg-brand text-neutral-950 shadow-md"
              >
                <Icon name="volleyball" size="s" />
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs font-medium text-fg-muted">
              <Icon name="globe" size="s" className="text-brand" />
              <span>{person.location}</span>
            </div>

            {person.volleyball && (
              <div className="w-full rounded-2xl border border-border bg-surface/70 p-4 text-center backdrop-blur-md">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-brand">
                  Court Position
                </div>
                <div className="mt-1 text-sm font-bold text-fg">
                  {person.volleyball.position}
                </div>
                <div className="mt-1 text-xs text-fg-muted">
                  {person.volleyball.favoriteSystem}
                </div>
              </div>
            )}

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

        <div className="flex flex-1 flex-col gap-12">
          <section
            id={about.intro.title}
            className="flex flex-col items-center text-center md:items-start md:text-left"
          >
            {about.calendar.display && (
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border-brand bg-brand-soft p-1.5 pl-3.5 backdrop-blur-md">
                <Icon name="calendar" size="s" className="text-brand" />
                <span className="text-xs font-semibold text-fg px-1">
                  Schedule a call or court session
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

            <h1 className="font-heading text-4xl sm:text-5xl font-extrabold tracking-tight text-fg">
              {person.name}
            </h1>
            <p className="mt-2 text-lg sm:text-xl font-medium text-brand">
              {person.role}
            </p>

            {social.length > 0 && (
              <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5 md:justify-start">
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
              <div className="mt-8 space-y-4 text-base leading-relaxed text-fg-muted">
                {about.intro.description}
              </div>
            )}
          </section>

          {about.work.display && (
            <section className="flex flex-col gap-6">
              <h2
                id={about.work.title}
                className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-fg border-b border-border pb-3"
              >
                {about.work.title}
              </h2>
              <div className="flex flex-col gap-10">
                {about.work.experiences.map((experience, index) => (
                  <div
                    key={`${experience.company}-${experience.role}-${index}`}
                    className="flex flex-col gap-2 rounded-2xl border border-border bg-surface/50 p-5 sm:p-6"
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3
                        id={experience.company}
                        className="font-heading text-xl font-bold text-fg"
                      >
                        {experience.company}
                      </h3>
                      <span className="font-mono text-xs text-fg-muted">
                        {experience.timeframe}
                      </span>
                    </div>
                    <div className="text-sm font-semibold text-brand mb-2">
                      {experience.role}
                    </div>
                    <ul className="list-disc space-y-2.5 pl-5 text-sm sm:text-base text-fg-muted marker:text-brand">
                      {experience.achievements.map((achievement, idx) => (
                        <li key={`${experience.company}-${idx}`} className="leading-relaxed">
                          {achievement}
                        </li>
                      ))}
                    </ul>
                    {experience.images && experience.images.length > 0 && (
                      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
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

          {about.studies.display && (
            <section className="flex flex-col gap-6">
              <h2
                id={about.studies.title}
                className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-fg border-b border-border pb-3"
              >
                {about.studies.title}
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {about.studies.institutions.map((institution, index) => (
                  <div
                    key={`${institution.name}-${index}`}
                    className="flex flex-col gap-2 rounded-2xl border border-border bg-surface/50 p-5"
                  >
                    <h3
                      id={institution.name}
                      className="font-heading text-lg font-bold text-fg"
                    >
                      {institution.name}
                    </h3>
                    <div className="text-sm leading-relaxed text-fg-muted">
                      {institution.description}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {about.technical.display && (
            <section className="flex flex-col gap-6">
              <h2
                id={about.technical.title}
                className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-fg border-b border-border pb-3"
              >
                {about.technical.title}
              </h2>
              <div className="flex flex-col gap-8">
                {about.technical.skills.map((skill, index) => (
                  <div
                    key={`${skill.title}-${index}`}
                    className="flex flex-col gap-3 rounded-2xl border border-border bg-surface/50 p-5 sm:p-6"
                  >
                    <h3
                      id={skill.title}
                      className="font-heading text-xl font-bold text-fg"
                    >
                      {skill.title}
                    </h3>
                    <div className="text-sm sm:text-base leading-relaxed text-fg-muted">
                      {skill.description}
                    </div>
                    {skill.tags && skill.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-1">
                        {skill.tags.map((tag, tagIndex) => (
                          <Tag
                            key={`${skill.title}-${tagIndex}`}
                            size="l"
                            prefixIcon={tag.icon}
                            variant="brand"
                          >
                            {tag.name}
                          </Tag>
                        ))}
                      </div>
                    )}
                    {skill.images && skill.images.length > 0 && (
                      <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
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
        </div>
      </div>
    </div>
  );
}
