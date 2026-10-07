from datetime import date
from django.db import migrations


def seed_data(apps, schema_editor):
    Profile = apps.get_model("portfolio", "Profile")
    AboutSection = apps.get_model("portfolio", "AboutSection")
    Project = apps.get_model("portfolio", "Project")
    Education = apps.get_model("portfolio", "Education")
    Skill = apps.get_model("portfolio", "Skill")
    SocialLink = apps.get_model("portfolio", "SocialLink")
    Achievement = apps.get_model("portfolio", "Achievement")
    Certification = apps.get_model("portfolio", "Certification")
    Resume = apps.get_model("portfolio", "Resume")

    # 1. Profile
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
                "Dhaka, Bangladesh"
            ],
            "created_date": date(2023, 1, 1),
        },
    )

    # 2. About Section
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

    # 3. Projects
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
            0,
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
            1,
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
            2,
        ),
    ]

    for slug, title, subtitle, desc, techs, live, github, order in projects:
        Project.objects.update_or_create(
            slug=slug,
            defaults={
                "title": title,
                "short_description": subtitle,
                "full_description": desc,
                "technologies": techs,
                "live_url": live,
                "github_url": github,
                "order": order,
                "is_featured": True,
                "is_published": True,
            },
        )

    # 4. Education
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
                "Docker"
            ],
            "order": 0,
            "is_visible": True,
        },
    )

    # 5. Technical Skills
    skills_data = [
        ("c-cpp", "C/C++", "https://isocpp.org/", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg", ["Languages"], 0),
        ("python", "Python", "https://www.python.org/", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", ["Languages"], 1),
        ("javascript", "JavaScript", "https://developer.mozilla.org/en-US/docs/Web/JavaScript", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", ["Languages"], 2),
        ("csharp", "C#", "https://learn.microsoft.com/en-us/dotnet/csharp/", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg", ["Languages"], 3),
        ("django", "Django", "https://www.djangoproject.com/", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg", ["Backend"], 4),
        ("drf", "Django REST Framework", "https://www.django-rest-framework.org/", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/djangorest/djangorest-original.svg", ["Backend"], 5),
        ("fastapi", "FastAPI", "https://fastapi.tiangolo.com/", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg", ["Backend"], 6),
        ("html5", "HTML5", "https://developer.mozilla.org/en-US/docs/Web/HTML", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", ["Frontend"], 7),
        ("css3", "CSS3", "https://developer.mozilla.org/en-US/docs/Web/CSS", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg", ["Frontend"], 8),
        ("tailwindcss", "Tailwind CSS", "https://tailwindcss.com/", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg", ["Frontend"], 9),
        ("react", "ReactJS", "https://react.dev/", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", ["Frontend"], 10),
        ("postgresql", "PostgreSQL", "https://www.postgresql.org/", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg", ["Database"], 11),
        ("mysql", "MySQL", "https://www.mysql.com/", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg", ["Database"], 12),
        ("git", "Git", "https://git-scm.com/", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", ["Tools"], 13),
        ("github", "GitHub", "https://github.com/", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg", ["Tools"], 14),
        ("linux", "Linux", "https://www.linux.org/", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg", ["Tools"], 15),
        ("docker", "Docker", "https://www.docker.com/", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg", ["Tools"], 16),
        ("dsa", "DSA", "https://en.wikipedia.org/wiki/Data_structure", "https://api.iconify.design/mdi:graph-outline.svg", ["Core Concepts"], 17),
        ("oop", "OOP", "https://en.wikipedia.org/wiki/Object-oriented_programming", "https://api.iconify.design/mdi:shape-outline.svg", ["Core Concepts"], 18),
    ]

    for key, title, href, icon_url, categories, order in skills_data:
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

    # 6. Achievements
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

    # 7. Certifications
    certs = [
        ("Introduction to Python", "DataCamp", date(2024, 1, 1), 0),
        ("Intermediate Python", "DataCamp", date(2024, 6, 1), 1),
        ("Machine Learning", "DataCamp", date(2024, 9, 1), 2),
        ("Deep Learning", "DataCamp", date(2025, 1, 1), 3),
    ]
    for title, issuer, issue_date, order in certs:
        Certification.objects.update_or_create(
            title=title,
            defaults={
                "issuer": issuer,
                "issue_date": issue_date,
                "order": order,
                "is_visible": True,
            },
        )

    # 8. Social Links
    social_data = [
        ("GitHub", "@ashrafulX", "https://github.com/ashrafulX", "https://assets.chanhdai.com/images/link-icons/github.webp?t=1759581475", 0),
        ("LinkedIn", "Md. Ashraful Islam", "https://linkedin.com/in/ashrafulx", "https://assets.chanhdai.com/images/link-icons/linkedin.webp?t=1759581475", 1),
        ("LeetCode", "@ashrafulx", "https://leetcode.com/u/ashrafulx/", "https://cdn.simpleicons.org/leetcode/FFA116", 2),
        ("Website", "ashraful.site", "https://ashraful.site", "https://assets.chanhdai.com/images/link-icons/website.webp?t=1759581475", 3),
    ]
    for platform, username, url, icon_url, order in social_data:
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

    # 9. Resume
    Resume.objects.update_or_create(
        pk=1,
        defaults={
            "title": "Md. Ashraful Islam - Resume",
            "external_url": "https://ashraful.site",
            "is_current": True,
        },
    )


def reverse_func(apps, schema_editor):
    pass


class Migration(migrations.Migration):

    dependencies = [
        ("portfolio", "0006_alter_fields_to_cloudinary"),
    ]

    operations = [
        migrations.RunPython(seed_data, reverse_func),
    ]

