from datetime import date

from django.core.management.base import BaseCommand
from django.utils import timezone

from portfolio.models import AboutSection, Achievement, BlogPost, Certification, Education, Experience, Profile, Project, Research, Resume, Skill, SocialLink


SKILLS = [
    ("c", "C", "https://en.wikipedia.org/wiki/C_(programming_language)", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg", ["Language"]),
    ("cpp", "C++", "https://isocpp.org/", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg", ["Language"]),
    ("csharp", "C#", "https://learn.microsoft.com/en-us/dotnet/csharp/", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg", ["Language"]),
    ("python", "Python", "https://www.python.org/", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", ["Language"]),
    ("javascript", "JavaScript", "https://developer.mozilla.org/en-US/docs/Web/JavaScript", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", ["Language"]),
    ("django", "Django", "https://www.djangoproject.com/", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg", ["Framework"]),
    ("django-rest-framework", "Django REST Framework", "https://www.django-rest-framework.org/", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/djangorest/djangorest-original.svg", ["Framework", "Backend"]),
    ("fastapi", "FastAPI", "https://fastapi.tiangolo.com/", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg", ["Framework", "Backend"]),
    ("dotnet", ".NET", "https://dotnet.microsoft.com/", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dot-net/dot-net-original.svg", ["Framework"]),
    ("mysql", "MySQL", "https://www.mysql.com/", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg", ["Database"]),
    ("postgresql", "PostgreSQL", "https://www.postgresql.org/", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg", ["Database"]),
    ("docker", "Docker", "https://www.docker.com/", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg", ["Containerization"]),
    ("fiverr", "Fiverr", "https://www.fiverr.com/", "https://cdn0.iconfinder.com/data/icons/social-flat-rounded-rects/512/fiverr-128.png", ["Others"]),
    ("stackoverflow", "Stack Overflow", "https://stackoverflow.com/", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/stackoverflow/stackoverflow-original.svg", ["Others"]),
    ("html5", "HTML5", "https://developer.mozilla.org/en-US/docs/Web/HTML", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", ["Language"]),
    ("css3", "CSS3", "https://developer.mozilla.org/en-US/docs/Web/CSS", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg", ["Language"]),
    ("tailwindcss", "Tailwind CSS", "https://tailwindcss.com/", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg", ["Framework"]),
    ("react", "React", "https://react.dev/", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", ["Framework", "Library"]),
    ("git", "Git", "https://git-scm.com/", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", ["Version Control"]),
    ("github", "GitHub", "https://github.com/", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg", ["Version Control"]),
    ("linux", "Linux", "https://www.linux.org/", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg", ["Operating System"]),
    ("data-structures-algorithms", "Data Structures & Algorithms", "https://en.wikipedia.org/wiki/Algorithms", "https://api.iconify.design/mdi:graph-outline.svg", ["Core Concepts"]),
    ("object-oriented-programming", "Object-Oriented Programming", "https://en.wikipedia.org/wiki/Object-oriented_programming", "https://api.iconify.design/mdi:shape-outline.svg", ["Core Concepts"]),
]


class Command(BaseCommand):
    help = "Create the initial CMS records from the existing portfolio content. Safe to run more than once."

    def handle(self, *args, **options):
        Profile.objects.update_or_create(pk=1, defaults={
            "name": "Md. Ashraful Islam", "professional_title": "Django & React Developer",
            "short_title": "Django & React Developer", "email": "ashrafulwho@gmail.com",
            "phone": "", "location": "Dhaka, Bangladesh", "pronouns": "he/him",
            "website": "https://historoam.com", "github_username": "ashrafulx",
            "timezone": "Asia/Dhaka",
            "hero_description": "Building with code. Learning one problem at a time.",
            "seo_keywords": ["md ashraful islam", "ashraful islam", "ashrafulx", "computer science student", "competitive programmer", "icpc preparation", "cse undergraduate"],
            "profile_image_url": "", "created_date": date(2026, 7, 17),
        })
        AboutSection.objects.update_or_create(pk=1, defaults={
            "title": "About",
            "content": "I am a Computer Science student at **Northern University Bangladesh** and a Django & React developer focused on building scalable, user-friendly web applications. I combine strong problem-solving skills, developed through competitive programming, with practical experience in Django, React, and Tailwind CSS.",
            "short_description": "Building with code. Learning one problem at a time.", "is_active": True,
        })

        projects = [
            ("dokanly", "Dokanly", "RESTful E-Commerce Platform", "An API-first e-commerce platform for managing products, shopping carts, orders, and customer workflows.\n- JWT authentication and role-based access control.\n- Secure RESTful APIs, product catalog, cart management, and order management.\n- OpenAPI/API documentation.\n- PostgreSQL database with Django REST Framework and React.", ["Django", "Django REST Framework", "React", "PostgreSQL"], "https://dokanly-server.vercel.app/", "https://github.com/ashrafulX/Dokanly"),
            ("vangari-mama", "Vangari Mama", "Recycling Marketplace", "A marketplace connecting people selling recyclable materials with local scrap collectors.\n- Role-based dashboards for seller and scrap collector workflows.\n- Bidding system and Google OAuth authentication.\n- Automated order workflows and an 8% platform commission system.\n- PostgreSQL transaction management.", ["Django", "PostgreSQL", "Tailwind CSS"], "https://vangarimama.vercel.app/", "https://github.com/ashrafulX/vangari-mama"),
            ("tiktok-clone", "TikTok Clone", "Social Video Platform", "A full-stack, server-rendered social video platform with real-time chat and notifications.\n- Video/image posting, personalized feed, likes, comments, and follow system.\n- Real-time direct messaging and live notifications using Django Channels and Redis.\n- Email-based authentication and Cloudinary media storage.\n- Deployed on Render.", ["Django", "WebSockets", "PostgreSQL", "Tailwind CSS"], "https://tiktok-clone-r9pl.onrender.com/", "https://github.com/ashrafulX/Tiktok-Clone"),
        ]
        for order, (slug, title, subtitle, description, technologies, live_url, github_url) in enumerate(projects):
            Project.objects.update_or_create(slug=slug, defaults={
                "title": title, "short_description": subtitle, "full_description": description,
                "technologies": technologies, "live_url": live_url, "github_url": github_url,
                "order": order, "is_featured": True, "is_published": True,
            })

        Experience.objects.update_or_create(pk=1, defaults={
            "company": "SoftZen IT", "position": "Full Stack Web Developer Intern",
            "employment_type": "Internship", "start_date": date(2026, 10, 1), "end_date": date(2026, 12, 31),
            "description": "Working as a Fullstack Engineering Intern, contributing to both backend and frontend development.",
            "responsibilities": ["Backend: Building scalable APIs and features using Django, DRF & PostgreSQL.", "Frontend: Developing responsive interfaces with React & Tailwind CSS.", "Collaborating with senior engineers on real-world projects involving cloud-native solutions and modern software practices."],
            "order": 0, "is_visible": True,
        })
        Education.objects.update_or_create(pk=1, defaults={
            "institution": "Northern University Bangladesh", "degree": "Bachelor's degree",
            "field_of_study": "Computer Science", "start_date": date(2023, 1, 1), "end_date": date(2026, 12, 31),
            "description": "Pursuing a Bachelor's degree in Computer Science.\n- Coursework spans programming fundamentals, data structures & algorithms, and software development.",
            "skills": ["Data Structures & Algorithms", "Object-Oriented Programming (OOP)", "Web Development", "Database Management Systems (DBMS)", "Problem Solving"],
        })
        for order, (key, title, href, icon_url, categories) in enumerate(SKILLS):
            Skill.objects.update_or_create(key=key, defaults={"title": title, "href": href, "icon_url": icon_url, "categories": categories, "order": order, "is_visible": True})

        social_links = [
            ("LinkedIn", "@ashrafulx", "https://linkedin.com/in/ashrafulx", "https://assets.chanhdai.com/images/link-icons/linkedin.webp?t=1759581475"),
            ("GitHub", "@ashrafulx", "https://github.com/ashrafulx", "https://assets.chanhdai.com/images/link-icons/github.webp?t=1759581475"),
            ("X (Formerly Twitter)", "@ashrafulx", "https://x.com/ashrafulx", "https://assets.chanhdai.com/images/link-icons/x.webp?t=1759581475"),
            ("LeetCode", "@ashrafulx", "https://leetcode.com/u/ashrafulx/", "https://cdn.simpleicons.org/leetcode/FFA116"),
        ]
        for order, (platform, username, url, icon_url) in enumerate(social_links):
            SocialLink.objects.update_or_create(platform=platform, defaults={"username": username, "url": url, "icon_url": icon_url, "order": order})

        Resume.objects.update_or_create(pk=1, defaults={
            "title": "My Resume", "external_url": "https://drive.google.com/file/d/15BO-LRMRNUZAdUVp5JISGaZOcqvM75ko/view?usp=sharing", "is_current": True,
        })
        Achievement.objects.update_or_create(pk=1, defaults={"title": "Inter-University Programming Contest (IUPC)", "prize": "2nd Place", "date": date(2026, 1, 1), "grade": "University", "description": "Secured 2nd place at the Inter-University Programming Contest (IUPC).", "order": 0})
        Achievement.objects.update_or_create(pk=2, defaults={"title": "Competitive Programming", "prize": "1000+ Problems Solved", "date": date(2025, 12, 1), "grade": "Personal Achievement", "description": "Solved 1000+ algorithmic problems across [Codeforces](https://codeforces.com/profile/iashraf), [LeetCode](https://leetcode.com/u/ashrafulx/), and [CodeChef](https://www.codechef.com/users/iashraful).", "order": 1})
        certifications = [("CodeChef 2 Star Coder", "Phitron"), ("Introduction to Python", "DataCamp"), ("Intermediate Python", "DataCamp"), ("Intermediate Machine Learning", "DataCamp"), ("Intermediate Deep Learning", "DataCamp")]
        for order, (title, issuer) in enumerate(certifications):
            Certification.objects.update_or_create(title=title, defaults={"issuer": issuer, "issue_date": date(2026, 1, 1), "credential_url": "", "order": order})
        Research.objects.update_or_create(pk=1, defaults={
            "title": "Tiny Object Detection from UAV Images", "status": "Ongoing",
            "description": "Exploring techniques for detecting small/tiny objects in aerial imagery captured by UAVs (drones). Details coming soon — I'll update this as the work progresses.",
        })

        self.stdout.write(self.style.SUCCESS("Initial portfolio CMS content is ready. No blog posts were created."))
