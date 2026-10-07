from datetime import date

from django.core.management.base import BaseCommand
from django.utils import timezone

from portfolio.models import AboutSection, Achievement, BlogPost, Certification, Education, Experience, Profile, Project, Research, Resume, Skill, SocialLink


SKILLS = [
    ("c-cpp", "C/C++", "https://isocpp.org/", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg", ["Languages"]),
    ("python", "Python", "https://www.python.org/", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", ["Languages"]),
    ("javascript", "JavaScript", "https://developer.mozilla.org/en-US/docs/Web/JavaScript", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", ["Languages"]),
    ("csharp", "C#", "https://learn.microsoft.com/en-us/dotnet/csharp/", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg", ["Languages"]),
    ("django", "Django", "https://www.djangoproject.com/", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg", ["Backend"]),
    ("drf", "Django REST Framework", "https://www.django-rest-framework.org/", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/djangorest/djangorest-original.svg", ["Backend"]),
    ("fastapi", "FastAPI", "https://fastapi.tiangolo.com/", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg", ["Backend"]),
    ("html5", "HTML5", "https://developer.mozilla.org/en-US/docs/Web/HTML", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", ["Frontend"]),
    ("css3", "CSS3", "https://developer.mozilla.org/en-US/docs/Web/CSS", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg", ["Frontend"]),
    ("tailwindcss", "Tailwind CSS", "https://tailwindcss.com/", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg", ["Frontend"]),
    ("react", "ReactJS", "https://react.dev/", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", ["Frontend"]),
    ("postgresql", "PostgreSQL", "https://www.postgresql.org/", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg", ["Database"]),
    ("mysql", "MySQL", "https://www.mysql.com/", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg", ["Database"]),
    ("git", "Git", "https://git-scm.com/", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", ["Tools"]),
    ("github", "GitHub", "https://github.com/", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg", ["Tools"]),
    ("linux", "Linux", "https://www.linux.org/", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg", ["Tools"]),
    ("docker", "Docker", "https://www.docker.com/", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg", ["Tools"]),
    ("dsa", "DSA", "https://en.wikipedia.org/wiki/Data_structure", "https://api.iconify.design/mdi:graph-outline.svg", ["Core Concepts"]),
    ("oop", "OOP", "https://en.wikipedia.org/wiki/Object-oriented_programming", "https://api.iconify.design/mdi:shape-outline.svg", ["Core Concepts"]),
]


class Command(BaseCommand):
    help = "Create the initial CMS records from the existing portfolio content. Safe to run more than once."

    def handle(self, *args, **options):
        Profile.objects.update_or_create(
            pk=1,
            defaults={
                "name": "Md. Ashraful Islam",
                "professional_title": "Software Engineer",
                "short_title": "Software Engineer",
                "email": "ashrafulwho@gmail.com",
                "phone": "+8801590-026285",
                "location": "Dhaka, Bangladesh",
                "pronouns": "he/him",
                "website": "https://ashraful.site",
                "github_username": "ashrafulX",
                "timezone": "Asia/Dhaka",
                "hero_description": "Computer Science and Engineering student & Software Engineer passionate about Python, Django, FastAPI, and PostgreSQL.",
                "seo_keywords": [
                    "Md. Ashraful Islam",
                    "Ashraful Islam",
                    "ashrafulX",
                    "Software Engineer",
                    "Django Developer",
                    "Python Developer",
                    "Full Stack Developer",
                    "Dhaka, Bangladesh",
                ],
                "created_date": date(2023, 1, 1),
            },
        )

        AboutSection.objects.update_or_create(
            pk=1,
            defaults={
                "title": "About",
                "content": (
                    "Computer Science and Engineering graduate/student with hands-on experience in **Python**, "
                    "**Django**, **FastAPI**, **Django REST Framework**, and **PostgreSQL**.\n\n"
                    "Experienced in developing REST APIs, implementing authentication, working with relational "
                    "databases, and building backend applications using **Git** and **Docker**.\n\n"
                    "Seeking an entry-level Software Engineer position to contribute to real-world software "
                    "projects, solve technical problems, and further develop professional software engineering skills."
                ),
                "short_description": "Computer Science student & Software Engineer building scalable backend systems.",
                "is_active": True,
            },
        )

        projects = [
            (
                "dokanly",
                "Dokanly",
                "RESTful E-Commerce Platform",
                (
                    "An API-first e-commerce platform for managing products, shopping carts, orders, and customer workflows.\n"
                    "- Implemented JWT authentication, role-based access control, and secure RESTful APIs\n"
                    "- Developed product catalog, cart, order management, and API documentation with OpenAPI\n"
                    "- Designed PostgreSQL database models and integrated Django REST Framework with React"
                ),
                ["Django", "DRF", "React", "PostgreSQL"],
                "https://dokanly-server.vercel.app/",
                "https://github.com/ashrafulX/Dokanly",
            ),
            (
                "vangari-mama",
                "Vangari Mama",
                "Recycling Marketplace",
                (
                    "A marketplace connecting people selling recyclable materials with local scrap collectors.\n"
                    "- Implemented role-based dashboards for sellers and scrap collectors with separate workflows\n"
                    "- Developed a bidding system, Google OAuth authentication, and automated order workflows\n"
                    "- Integrated an 8% platform commission system with PostgreSQL-based transaction management"
                ),
                ["Django", "PostgreSQL", "Tailwind CSS"],
                "https://vangarimama.vercel.app/",
                "https://github.com/ashrafulX/vangari-mama",
            ),
            (
                "tiktok-clone",
                "TikTok Clone",
                "Social Video Platform",
                (
                    "A full-stack, server-rendered social video platform with real-time chat and notifications.\n"
                    "- Built video/image posting, personalized feed, likes, comments, and a follow system\n"
                    "- Implemented real-time direct messaging and live notifications using Django Channels and Redis\n"
                    "- Integrated email-based authentication and Cloudinary media storage, deployed on Render"
                ),
                ["Django", "WebSockets", "PostgreSQL", "Tailwind CSS"],
                "https://tiktok-clone-r9pl.onrender.com/",
                "https://github.com/ashrafulX/Tiktok-Clone",
            ),
        ]
        for order, (slug, title, subtitle, description, technologies, live_url, github_url) in enumerate(projects):
            Project.objects.update_or_create(
                slug=slug,
                defaults={
                    "title": title,
                    "short_description": subtitle,
                    "full_description": description,
                    "technologies": technologies,
                    "live_url": live_url,
                    "github_url": github_url,
                    "order": order,
                    "is_featured": True,
                    "is_published": True,
                },
            )

        Education.objects.update_or_create(
            pk=1,
            defaults={
                "institution": "Northern University Bangladesh",
                "degree": "B.Sc. in Computer Science and Engineering",
                "field_of_study": "Computer Science and Engineering",
                "grade": "CGPA: 3.42",
                "start_date": date(2023, 1, 1),
                "end_date": date(2026, 12, 31),
                "description": "B.Sc. in Computer Science and Engineering (Jan 2023 – Dec 2026). Coursework in Software Engineering, Algorithms, Database Systems, and Web Technologies.",
                "skills": [
                    "Data Structures & Algorithms (DSA)",
                    "Object-Oriented Programming (OOP)",
                    "Python",
                    "Django",
                    "PostgreSQL",
                    "Docker",
                ],
                "order": 0,
                "is_visible": True,
            },
        )

        for order, (key, title, href, icon_url, categories) in enumerate(SKILLS):
            Skill.objects.update_or_create(
                key=key,
                defaults={
                    "title": title,
                    "href": href,
                    "icon_url": icon_url,
                    "categories": categories,
                    "order": order,
                    "is_visible": True,
                },
            )

        social_links = [
            ("GitHub", "@ashrafulX", "https://github.com/ashrafulX", "https://assets.chanhdai.com/images/link-icons/github.webp?t=1759581475"),
            ("LinkedIn", "Md. Ashraful Islam", "https://linkedin.com/in/ashrafulx", "https://assets.chanhdai.com/images/link-icons/linkedin.webp?t=1759581475"),
            ("LeetCode", "@ashrafulx", "https://leetcode.com/u/ashrafulx/", "https://cdn.simpleicons.org/leetcode/FFA116"),
            ("Website", "ashraful.site", "https://ashraful.site", "https://assets.chanhdai.com/images/link-icons/website.webp?t=1759581475"),
        ]
        for order, (platform, username, url, icon_url) in enumerate(social_links):
            SocialLink.objects.update_or_create(
                platform=platform,
                defaults={
                    "username": username,
                    "url": url,
                    "icon_url": icon_url,
                    "order": order,
                    "is_visible": True,
                },
            )

        Resume.objects.update_or_create(
            pk=1,
            defaults={
                "title": "Md. Ashraful Islam - Resume",
                "external_url": "https://ashraful.site",
                "is_current": True,
            },
        )

        Achievement.objects.update_or_create(
            pk=1,
            defaults={
                "title": "Inter-University Programming Contest (IUPC)",
                "prize": "2nd Place",
                "date": date(2025, 1, 1),
                "grade": "2nd Place Winner",
                "description": "Achieved 2nd Place in Inter-University Programming Contest (IUPC).",
                "order": 0,
                "is_visible": True,
            },
        )
        Achievement.objects.update_or_create(
            pk=2,
            defaults={
                "title": "Competitive Programming Problem Solving",
                "prize": "1000+ Problems Solved",
                "date": date(2025, 12, 1),
                "grade": "1000+ Solved",
                "description": "Solved 1000+ algorithmic problems across Codeforces, LeetCode, and CodeChef.",
                "order": 1,
                "is_visible": True,
            },
        )

        certifications = [
            ("Introduction to Python", "DataCamp", date(2024, 1, 1)),
            ("Intermediate Python", "DataCamp", date(2024, 6, 1)),
            ("Machine Learning", "DataCamp", date(2024, 9, 1)),
            ("Deep Learning", "DataCamp", date(2025, 1, 1)),
        ]
        for order, (title, issuer, issue_date) in enumerate(certifications):
            Certification.objects.update_or_create(
                title=title,
                defaults={
                    "issuer": issuer,
                    "issue_date": issue_date,
                    "order": order,
                    "is_visible": True,
                },
            )

        self.stdout.write(self.style.SUCCESS("Initial portfolio CMS content is ready with updated resume details."))
