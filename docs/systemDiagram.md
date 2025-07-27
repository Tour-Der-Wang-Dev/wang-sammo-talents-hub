
# System Architecture Diagram

## Core Components

```
┌───────────────────────────────────────────────────────────┐
│                        Client                             │
└───────────────────────┬───────────────────────────────────┘
                        │
┌───────────────────────▼───────────────────────────────────┐
│                  React Application                         │
│                                                           │
│  ┌─────────────┐     ┌─────────────┐     ┌─────────────┐  │
│  │    Pages    │     │  Components │     │    Hooks    │  │
│  │             │     │             │     │             │  │
│  │  - Index    │     │  - Header   │     │ - useMobile │  │
│  │  - JobsPage │     │  - Footer   │     │ - useToast  │  │
│  │  - JobDetail│     │  - JobCard  │     │             │  │
│  │  - Companies│     │  - Search   │     │             │  │
│  └──────┬──────┘     └──────┬──────┘     └─────────────┘  │
│         │                   │                              │
│  ┌──────▼───────────────────▼──────┐    ┌─────────────┐   │
│  │        React Router             │    │    Utils    │   │
│  └──────────────────────────────────┘    │             │   │
│                                          │  - SEO      │   │
│  ┌──────────────────────────────────┐    │  - Sitemap  │   │
│  │           UI Library             │    │             │   │
│  │        (Shadcn/Tailwind)         │    └─────────────┘   │
│  └──────────────────────────────────┘                      │
│                                                            │
└────────────────────────┬───────────────────────────────────┘
                         │
                         │                    
┌────────────────────────▼───────────────────────────────────┐
│                     Supabase                               │
│                                                            │
│  ┌─────────────────┐      ┌─────────────────────────────┐  │
│  │  Authentication │      │           Database           │  │
│  │                 │      │                             │  │
│  │ - User Sessions │      │ - Companies                 │  │
│  │ - User Profiles │      │ - Jobs                      │  │
│  │ - OAuth         │      │ - Applications              │  │
│  └────────┬────────┘      └──────────────┬──────────────┘  │
│           │                               │                │
│  ┌────────▼────────┐      ┌──────────────▼──────────────┐  │
│  │     Storage     │      │         Functions           │  │
│  │                 │      │                             │  │
│  │ - Company Logos │      │ - Email Notifications       │  │
│  │ - User Avatars  │      │ - Background Processing     │  │
│  └─────────────────┘      └─────────────────────────────┘  │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

## Data Flow

```
┌───────────────┐         ┌───────────────┐         ┌───────────────┐
│   User         │         │  React App    │         │  Supabase     │
│   Interface    │◄────────┤   Components  │◄────────┤  Database     │
└───────┬───────┘         └───────┬───────┘         └───────────────┘
        │                         │                          │
        │                         │                          │
        ▼                         ▼                          ▼
┌───────────────┐         ┌───────────────┐         ┌───────────────┐
│   User         │         │  State        │         │  External     │
│   Interactions │────────►│  Management   │────────►│  Services     │
└───────────────┘         └───────────────┘         │  (Maps, etc)  │
                                                    └───────────────┘
```

## Authentication Flow

```
┌───────────────┐         ┌───────────────┐         ┌───────────────┐
│   Login        │         │  Supabase     │         │  Session      │
│   Form         │────────►│  Auth         │────────►│  Management   │
└───────────────┘         └───────────────┘         └───────┬───────┘
                                                           │
                                                           ▼
┌───────────────┐         ┌───────────────┐         ┌───────────────┐
│   Protected   │◄────────┤   Auth        │◄────────┤   JWT Token   │
│   Routes      │         │   Context     │         │   Storage     │
└───────────────┘         └───────────────┘         └───────────────┘
```

## Job Application Process

```
┌───────────────┐         ┌───────────────┐         ┌───────────────┐
│   Job          │         │  Application  │         │  Supabase     │
│   Listing      │────────►│  Form         │────────►│  Database     │
└───────────────┘         └───────────────┘         └───────┬───────┘
                                                           │
                                                           ▼
┌───────────────┐         ┌───────────────┐         ┌───────────────┐
│   Company     │◄────────┤  Notification │◄────────┤  Application  │
│   Dashboard   │         │  System       │         │  Processing   │
└───────────────┘         └───────────────┘         └───────────────┘
```

## Map Integration

```
┌───────────────┐         ┌───────────────┐         ┌───────────────┐
│   Location    │         │  Geocoding    │         │  Map          │
│   Data        │────────►│  Service      │────────►│  Component    │
└───────────────┘         └───────────────┘         └───────┬───────┘
                                                           │
                                                           ▼
┌───────────────┐         ┌───────────────┐         ┌───────────────┐
│   Job/Company │◄────────┤  Interactive  │◄────────┤  User         │
│   Detail      │         │  Elements     │         │  Interaction  │
└───────────────┘         └───────────────┘         └───────────────┘
```

## Deployment Architecture

```
┌───────────────┐         ┌───────────────┐         ┌───────────────┐
│   Source      │         │  Build        │         │  Static       │
│   Code        │────────►│  Process      │────────►│  Assets       │
└───────────────┘         └───────────────┘         └───────┬───────┘
                                                           │
                                                           ▼
┌───────────────┐         ┌───────────────┐         ┌───────────────┐
│   User        │◄────────┤   CDN         │◄────────┤   Hosting     │
│   Browser     │         │   Cache       │         │   Service     │
└───────────────┘         └───────────────┘         └───────────────┘
```

## Multilingual Support

```
┌───────────────┐         ┌───────────────┐         ┌───────────────┐
│   Language    │         │  Translation  │         │  Localized    │
│   Selection   │────────►│  Context      │────────►│  Content      │
└───────────────┘         └───────────────┘         └───────────────┘
```

## Future Enhancements

- Real-time job notifications
- Advanced search with geolocation filters
- Employer dashboard with analytics
- Application tracking system
- Recommendation engine
- Mobile application integration
