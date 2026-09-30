from rest_framework import serializers

from .models import AboutSection, Achievement, BlogPost, Category, Certification, Education, Experience, Profile, Project, Research, Resume, Skill, SocialLink, Tag


def media_or_url(request, field, fallback=""):
    try:
        value = field.url if field and field.name else ""
    except ValueError:
        value = ""
    if value and request:
        return request.build_absolute_uri(value)
    return value or fallback


class ProfileSerializer(serializers.ModelSerializer):
    displayName = serializers.CharField(source="name")
    jobTitle = serializers.CharField(source="professional_title")
    jobs = serializers.SerializerMethodField()
    avatar = serializers.SerializerMethodField()
    phoneNumber = serializers.CharField(source="phone")
    website = serializers.CharField()
    address = serializers.CharField(source="location")
    username = serializers.CharField(source="github_username")
    dateCreated = serializers.DateField(source="created_date", allow_null=True)

    class Meta:
        model = Profile
        fields = ["displayName", "jobTitle", "short_title", "pronouns", "email", "phoneNumber", "website", "address", "username", "availability", "hero_description", "seo_keywords", "timezone", "avatar", "dateCreated", "jobs"]

    def get_jobs(self, obj):
        return [{"title": obj.professional_title, "company": "", "website": ""}] if obj.professional_title else []

    def get_avatar(self, obj):
        return media_or_url(self.context.get("request"), obj.profile_image, obj.profile_image_url)

class AboutSerializer(serializers.ModelSerializer):
    class Meta:
        model = AboutSection
        fields = ["title", "content", "short_description", "updated_at"]


class ProjectSerializer(serializers.ModelSerializer):
    id = serializers.CharField(source="slug")
    title = serializers.SerializerMethodField()
    liveLink = serializers.CharField(source="live_url")
    githubLink = serializers.CharField(source="github_url")
    skills = serializers.JSONField(source="technologies")
    description = serializers.CharField(source="full_description")
    image = serializers.SerializerMethodField()
    isExpanded = serializers.BooleanField(source="is_featured")

    class Meta:
        model = Project
        fields = ["id", "title", "liveLink", "githubLink", "skills", "description", "image", "isExpanded"]

    def get_title(self, obj):
        return obj.title + (f" — {obj.short_description}" if obj.short_description else "")

    def get_image(self, obj):
        return media_or_url(self.context.get("request"), obj.featured_image, obj.featured_image_url)


class ExperienceSerializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField()
    companyName = serializers.CharField(source="company")
    positions = serializers.SerializerMethodField()

    class Meta:
        model = Experience
        fields = ["id", "companyName", "positions"]

    def get_id(self, obj):
        return str(obj.pk)

    def get_positions(self, obj):
        description = obj.description
        if obj.responsibilities:
            description = "\n".join([description, *(f"- {item}" for item in obj.responsibilities if item)])
        return [{
            "id": str(obj.pk), "title": obj.position,
            "employmentPeriod": {"start": obj.start_date.strftime("%m.%Y") if obj.start_date else "", "end": obj.end_date.strftime("%m.%Y") if obj.end_date else ""},
            "employmentType": obj.employment_type, "icon": "code", "description": description,
            "skills": [], "isExpanded": True,
        }]


class EducationSerializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField()
    companyName = serializers.SerializerMethodField()
    positions = serializers.SerializerMethodField()

    class Meta:
        model = Education
        fields = ["id", "companyName", "positions"]

    def get_id(self, obj):
        return f"education-{obj.pk}"

    def get_companyName(self, obj):
        return "Education"

    def get_positions(self, obj):
        return [{
            "id": str(obj.pk), "title": obj.institution,
            "employmentPeriod": {"start": obj.start_date.strftime("%m.%Y") if obj.start_date else "", "end": obj.end_date.strftime("%m.%Y") if obj.end_date else ""},
            "icon": "education", "description": obj.description, "skills": obj.skills,
        }]


class SkillSerializer(serializers.ModelSerializer):
    iconUrl = serializers.SerializerMethodField()
    theme = serializers.SerializerMethodField()

    class Meta:
        model = Skill
        fields = ["key", "title", "href", "categories", "iconUrl", "theme"]

    def get_theme(self, obj):
        return None

    def get_iconUrl(self, obj):
        return media_or_url(self.context.get("request"), obj.icon, obj.icon_url)


class SocialLinkSerializer(serializers.ModelSerializer):
    title = serializers.CharField(source="platform")
    description = serializers.SerializerMethodField()
    href = serializers.SerializerMethodField()
    icon = serializers.CharField(source="icon_url")
    padding = serializers.SerializerMethodField()

    class Meta:
        model = SocialLink
        fields = ["title", "description", "href", "icon", "padding"]

    def get_padding(self, obj):
        return obj.platform.lower() == "leetcode"

    def get_description(self, obj):
        if obj.platform.lower() == "github":
            username = getattr(obj, "profile_github_username", None)
            return f"@{username}" if username else obj.username
        return obj.username

    def get_href(self, obj):
        if obj.platform.lower() == "github":
            username = getattr(obj, "profile_github_username", None)
            return f"https://github.com/{username}" if username else obj.url
        return obj.url


class ResumeSerializer(serializers.ModelSerializer):
    url = serializers.SerializerMethodField()

    class Meta:
        model = Resume
        fields = ["title", "url", "uploaded_at"]

    def get_url(self, obj):
        return media_or_url(self.context.get("request"), obj.file, obj.external_url)


class AchievementSerializer(serializers.ModelSerializer):
    id = serializers.CharField(source="pk")

    class Meta:
        model = Achievement
        fields = ["id", "title", "prize", "date", "grade", "description"]


class CertificationSerializer(serializers.ModelSerializer):
    issueDate = serializers.DateField(source="issue_date", allow_null=True)
    credentialID = serializers.CharField(source="credential_id")
    credentialURL = serializers.CharField(source="credential_url")

    class Meta:
        model = Certification
        fields = ["title", "issuer", "issueDate", "credentialID", "credentialURL"]


class ResearchSerializer(serializers.ModelSerializer):
    id = serializers.CharField(source="pk")

    class Meta:
        model = Research
        fields = ["id", "title", "status", "description"]


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["name", "slug"]


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ["name", "slug"]


class BlogPostSerializer(serializers.ModelSerializer):
    featuredImage = serializers.SerializerMethodField()
    publishedAt = serializers.DateTimeField(source="published_at")
    readingTime = serializers.IntegerField(source="reading_time")
    category = serializers.SlugRelatedField(read_only=True, slug_field="name")
    tags = serializers.SlugRelatedField(many=True, read_only=True, slug_field="name")

    class Meta:
        model = BlogPost
        fields = ["title", "slug", "excerpt", "content", "featuredImage", "author", "category", "tags", "publishedAt", "readingTime", "is_featured", "created_at", "updated_at"]

    def get_featuredImage(self, obj):
        return media_or_url(self.context.get("request"), obj.featured_image)
