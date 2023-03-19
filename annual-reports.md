---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: page
title: Annual Reports
---

<div class="py-5">
    <div class="container">
        <h1>Annual Reports</h1>

        <p>
            CLIR as an organization was formed by the merger of the Council on Library Resources (CLR) and the Commission on Preservation & Access (CPA) in 1995. Here you will find the Annual Reports for all three organizations starting in 1957.
        </p>

        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            {% for report in site.data.annual_reports %}
                {% assign path = '/assets/images/annual_reports/' %}
                <div class="col">
                    <div class="card shadow-sm h-100">
                        <img src="{{ report.thumbnail | prepend: path }}" alt="{{ report.title }}">
                        <div class="card-body bg-light">
                            <h5 class="card-title">{{ report.title }}</h5>
                            {% if report.zenodo %}
                            <a href="{{ report.zenodo }}" class="btn btn-primary" target="_blank">Read</a>
                            {% assign doi = report.zenodo | split: '/' | last %}
                            <a href="https://doi.org/10.5281/zenodo.{{doi}}"><img src="https://zenodo.org/badge/DOI/10.5281/zenodo.{{doi}}.svg" alt="DOI"></a>

                            {% endif %}
                        </div>
                    </div>
                </div>
            {% endfor %}
        </div>
    </div>
</div>
{%- comment -%}
* [2021 - 2022 Annual Report](https://zenodo.org/record/7706074)
* [2020 - 2021 Annual Report](https://zenodo.org/record/7706067)
* [2016 - 2017 Annual Report](https://zenodo.org/record/7706059)
* [2015 - 2016 Annual Report](https://zenodo.org/record/7706053)
* [2014 - 2015 Annual Report](https://zenodo.org/record/7706051)
* [2013 - 2014 Annual Report](https://zenodo.org/record/7706047)
* [2012 - 2013 Annual Report](https://zenodo.org/record/7706043)
* [2011 - 2012 Annual Report](https://zenodo.org/record/7706025)
* [2010 - 2011 Annual Report](https://zenodo.org/record/7706023)
* [2009 - 2010 Annual Report](https://zenodo.org/record/7706019)
* [2008 - 2009 Annual Report](https://zenodo.org/record/7706014)
* [2007-2008 Annual Report](https://zenodo.org/record/7706010)
* [2006 Annual Report](https://zenodo.org/record/7706004)
* [2005 Annual Report](https://zenodo.org/record/7706002)
* [2004 Annual Report](https://zenodo.org/record/7705998)
* [2003-2004 Annual Report](https://zenodo.org/record/7705996)
* [2002-2003 Annual Report](https://zenodo.org/record/7705992)
* [2001-2002 Annual Report](https://zenodo.org/record/7705988)
* [2000-2001 Annual Report](https://zenodo.org/record/7705982)
* [1999-2000 Annual Report](https://zenodo.org/record/7705970)
* [1998-1999 Annual Report](https://zenodo.org/record/7705949)
* [1997-1998 Annual Report](https://zenodo.org/record/7705945)
* [1996-1997 Annual Report](https://zenodo.org/record/7705937)
* [38th Annual Report: 1994](https://zenodo.org/record/7705935)
* [1995-1996 Annual Report](https://zenodo.org/record/7705928)
* [38th Annual Report: 1994](https://zenodo.org/record/7705922)
* [1994-1995 Annual Report](https://zenodo.org/record/7705920)
* [37th Annual Report: 1993](https://zenodo.org/record/7705911)
* [1993-1994 Annual Report](https://zenodo.org/record/7705905)
* [36th Annual Report: 1992](https://zenodo.org/record/7705899)
* [1992-1993 Annual Report](https://zenodo.org/record/7705885)
* [35th Annual Report: 1991](https://zenodo.org/record/7705880)
* [THE COMMISSION ON PRESERVATION AND ACCESS Annual Report: 1992](https://zenodo.org/record/7705876)
* [34th Annual Report: 1990](https://zenodo.org/record/7705867)
* [THE COMMISSION ON PRESERVATION AND ACCESS Annual Report: 1991](https://zenodo.org/record/7705859)
* [33rd Annual Report: 1989](https://zenodo.org/record/7705837)
* [32nd Annual Report: 1988](https://zenodo.org/record/7705837)
* [COMMISSION ON PRESERVATION AND ACCESS ANNUAL REPORT JULY 1,1988 - JUNE 30,1989](https://zenodo.org/record/7705833)
* [31st Annual Report: 1987](https://zenodo.org/record/7705829)
* [30th Annual Report: 1986](https://zenodo.org/record/7705788)
* [29th Annual Report: 1985](https://zenodo.org/record/7705746)
* [28th Annual Report: 1984](https://zenodo.org/record/7705679)
* [27th Annual Report: 1983](https://zenodo.org/record/7703093)
* [Annual Report to Foundations: 1984](https://zenodo.org/record/7705449)
* [THE COMMISSION ON PRESERVATION AND ACCESS: ANNUAL REPORT:1990](https://zenodo.org/record/7705432)
* [26th Annual Report: 1982](https://zenodo.org/record/7703093)
* [ANNUAL REPORT TO FOUNDATIONS: July 1, 1981 - June 30, 1982](https://zenodo.org/record/7703080)
* [25th Annual Report: 1981](https://zenodo.org/record/7640335)
* [24th Annual Report: 1980](https://zenodo.org/record/7640072)
* [ANNUAL REPORT TO FOUNDATIONS: July 1, 1980 - June 30, 1981](https://zenodo.org/record/7640036)
* [BIBLIOGRAPHIC SERVICE DEVELOPMENT PROGRAM: ACTIVITIES AND CONCERNS TO DATE](https://zenodo.org/record/7640005)
* [23rd Annual Report: 1979](https://zenodo.org/record/7637582)
* [ANNUAL REPORT TO FOUNDATIONS July 1, 1979 - June 30, 1980](https://zenodo.org/record/7637544)
* [22nd Annual Report: 1978](https://zenodo.org/record/7637430)
* [REPORT TO THE FORD FOUNDATION: July 1, 1977 - June 30, 1978](https://zenodo.org/record/7637428)
* [21st Annual Report: 1977](https://zenodo.org/record/7622837)
* [20th Annual Report: 1976](https://zenodo.org/record/7622570)
* [19th Annual Report for the Year Ending June 30, 1975](https://zenodo.org/record/7622551)
* [REPORT TO THE FORD FOUNDATION: July 1, 1975 - June 30, 1976](https://zenodo.org/record/7622547)
* [REPORT TO THE FORD FOUNDATION: July 1, 1974 - June 30, 1975](https://zenodo.org/record/7622517)
* [18th Annual Report for the Year Ending June 30, 1974](https://zenodo.org/record/7622501)
* [COUNCIL ON LIBRARY RESOURCES: A REVIEW OF ITS WORK](https://zenodo.org/record/7622485) **This is not an Annual Report**
* [17th Annual Report for the Year Ending June 30, 1973](https://zenodo.org/record/7622469)
* [16th Annual Report for the Year Ending June 30, 1972](https://zenodo.org/record/7622434)
* [15th Annual Report for the Year Ending June 30, 1971](https://zenodo.org/record/7622419)
* [14th Annual Report, For the Period Ending June 30, 1970](https://zenodo.org/record/7622349)
* [12th ANNUAL REPORT for the year ended June 30, 1968](https://zenodo.org/record/7622304)
* [11th ANNUAL REPORT for the year ended June 30, 1967](https://zenodo.org/record/7622296)
* [10th Annual Report for the period ending June 30, 1966](https://zenodo.org/record/7622288)
* [9th Annual Report for the period ending June 30, 1965](https://zenodo.org/record/7622280)
* [8th Annual Report for the period ending June 30, 1964](https://zenodo.org/record/7622259)
* [7th Annual Report for the period ending June 30, 1963](https://zenodo.org/record/7622035)
* [6th Annual Report for the period ending June 30, 1962](https://zenodo.org/record/7621994)
* [5th Annual Report for the period ending June 30, 1961](https://zenodo.org/record/7621881)
* [Reports of Projects and Publications Resulting from Projects](https://zenodo.org/record/7621797) **Not an Annual Report**
* [FOURTH ANNUAL REPORT for the period ending June 30, 1960](https://zenodo.org/record/7621494)
* [Third ANNUAL REPORT for the period ending June 30,1959](https://zenodo.org/record/7621373)
* [2nd ANNUAL REPORT for the period ending June 30, 1958](https://zenodo.org/record/7621352)
* [1ST ANNUAL REPORT For the period ending June 30, 1957](https://zenodo.org/record/7621294)
{%- endcomment -%}