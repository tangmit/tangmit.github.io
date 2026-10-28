---
title: "Publications"
permalink: /publications/
author_profile: true
---

<div class="publication-explorer" data-publication-explorer>
  <p class="publication-explorer__intro">Explore my research by technology. Select an option below to narrow the publication list.</p>

  <div class="publication-filters" aria-label="Filter publications">
    <div class="publication-filter-group" data-filter-group="technology">
      <span class="publication-filter-group__label">Technology</span>
      <div class="publication-filter-group__options">
        <button class="publication-chip" type="button" data-filter-value="all" aria-pressed="true">All</button>
        <button class="publication-chip" type="button" data-filter-value="telemedicine" aria-pressed="false">Telemedicine</button>
        <button class="publication-chip" type="button" data-filter-value="remote-monitoring" aria-pressed="false">Remote monitoring</button>
        <button class="publication-chip" type="button" data-filter-value="portal-messaging" aria-pressed="false">Portal messaging</button>
        <button class="publication-chip" type="button" data-filter-value="ai" aria-pressed="false">AI</button>
      </div>
    </div>

    <div class="publication-filter-summary" aria-live="polite">
      <span data-result-count>Showing {{ site.data.publications.size }} publications</span>
      <button class="publication-clear" type="button" data-clear-filters>Clear filters</button>
    </div>
  </div>

  {% if site.author.googlescholar %}
    <p class="publication-explorer__intro publication-explorer__scholar">You can also find my articles on my <a href="{{ site.author.googlescholar }}">Google Scholar profile</a>.</p>
  {% endif %}

  {% assign sections = "peer-reviewed|Peer-reviewed journal articles,other-articles|Other articles,genetics|Genetics and computational biology articles" | split: "," %}
  {% for section_data in sections %}
    {% assign section_parts = section_data | split: "|" %}
    {% assign section_key = section_parts[0] %}
    {% assign section_title = section_parts[1] %}
    <section class="publication-section" data-publication-section>
      <h2 class="publication-section__heading">{{ section_title }}</h2>

      {% if section_key == "genetics" %}
        <br aria-hidden="true">
        <p class="publication-section__description">As an undergraduate, I conducted research at the <a href="https://www.penn-ngc.org/">Penn Neurodegeneration Genomics Center (PNGC)</a>, applying computational methods to study the genetics of late-onset Alzheimer’s disease. This work is tangential to my current research, but I include it here to reflect my full publication record.</p>
      {% endif %}

      {% for publication in site.data.publications %}
        {% if publication.section == section_key %}
          <article class="publication-card"
            data-publication
            data-year="{{ publication.year }}"
            data-technology="{{ publication.technology | join: ' ' }}">
            <div class="publication-card__year">{{ publication.year }}</div>
            <h3 class="publication-card__title"><a href="{{ publication.url }}">{{ publication.title }}</a></h3>
            <p class="publication-card__citation">{{ publication.authors }} <em>{{ publication.publication }}</em>.</p>
            <div class="publication-card__tags" aria-label="Publication tags">
              {% for technology in publication.technology %}
                <span class="publication-card__tag">
                  {% case technology %}
                    {% when "telemedicine" %}Telemedicine
                    {% when "remote-monitoring" %}Remote monitoring
                    {% when "portal-messaging" %}Portal messaging
                    {% when "ai" %}AI
                    {% else %}Other
                  {% endcase %}
                </span>
              {% endfor %}
            </div>
            {% if publication.media %}
              <p class="publication-card__media">📣 <em>Media coverage:</em>
                {% for outlet in publication.media %}<a href="{{ outlet.url }}">{{ outlet.name }}</a>{% unless forloop.last %}, {% endunless %}{% endfor %}
              </p>
            {% endif %}
          </article>
        {% endif %}
      {% endfor %}
    </section>
  {% endfor %}

  <p class="publication-empty" data-empty-state hidden>No publications match these filters. Try clearing one of your selections.</p>
</div>

<script src="{{ '/assets/js/publications.js' | relative_url }}" defer></script>
