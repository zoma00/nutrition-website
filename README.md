# Nutrition Clinic Website Demo

![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=111111)
![Responsive](https://img.shields.io/badge/Responsive-Desktop%20%7C%20Mobile-7C3AED)
![License](https://img.shields.io/badge/License-MIT-blue)

A responsive, bilingual frontend demo for a therapeutic nutrition clinic. The site combines a branded landing page, service presentation, professional profile, nutrition topics, article links, and direct contact paths in a static implementation that requires no build step.

> **Project status:** Frontend demonstration. Appointment buttons that use `href="#"` are visual placeholders and are not connected to a booking system or backend.

## Features

- Responsive layouts for desktop, tablet, and mobile screens
- Three-slide hero carousel with automatic rotation and manual controls
- English and Arabic interface content with the selected language saved in `localStorage`
- Therapeutic nutrition, weight-management, diet-plan, and lifestyle service cards
- Professional profile and nutrition-topic sections
- Smooth navigation to portfolio, article, and contact sections
- Direct telephone, WhatsApp, Instagram, location, and external article links
- Static delivery using HTML, CSS, and vanilla JavaScript

## Technology

- Semantic HTML5
- Responsive CSS3 with media queries
- Vanilla JavaScript
- Google Fonts: Cairo and Montserrat
- Font Awesome icons through a CDN

## Project Structure

```text
index.html                              Root redirect to the clinic demo
clinic_website_demo/
├── index.html                          Main clinic landing page
└── assets/
    ├── css/styles.css                  Layout, branding, RTL, and responsive styles
    ├── js/main.js                      Slider, smooth scrolling, and localization
    └── images/                         Site imagery
```

## Run Locally

The project has no package installation or build step.

```bash
git clone https://github.com/zoma00/nutrition-website.git
cd nutrition-website
python3 -m http.server 8080
```

Open <http://localhost:8080>. The root page redirects to the clinic demo automatically.

## Current Scope

This repository implements the public-facing frontend only. It does not currently include:

- Appointment scheduling or form submission
- A database, API, or administrative dashboard
- User authentication
- Analytics or content-management integration

## License

Licensed under the [MIT License](LICENSE).
