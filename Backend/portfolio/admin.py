from django.contrib import admin

from .models import AboutSection, Achievement, BlogPost, Category, Certification, Education, Experience, Profile, Project, Research, Resume, Skill, SocialLink, Tag


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ("name", "professional_title", "email", "location", "updated_at")
    search_fields = ("name", "email", "github_username")
    fieldsets = (
        ("Identity", {
            "fields": (
                "name", "professional_title", "short_title",
                "profile_image", "profile_image_url",
                "hero_description", "availability"
            )
        }),
        ("Contact", {
            "fields": (
                "email", "phone", "location", "pronouns", "website", "timezone"
            )
        }),
        ("Social profiles", {"fields": ("github_username",)}),
        ("SEO", {"fields": ("seo_keywords",)}),
        ("Metadata", {"fields": ("created_date", "updated_at")})
    )
    readonly_fields = ("updated_at",)


@admin.register(AboutSection)
class AboutAdmin(admin.ModelAdmin):
    list_display = ("title", "is_active", "updated_at")
    list_filter = ("is_active",)
    search_fields = ("title", "content")
    readonly_fields = ("updated_at",)


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ("title", "is_featured", "is_published", "order", "updated_at")
    list_filter = ("is_featured", "is_published")
    search_fields = ("title", "short_description", "full_description")
    prepopulated_fields = {"slug": ("title",)}
    ordering = ("order", "title")
    fieldsets = (("Project", {"fields": ("title", "slug", "short_description", "full_description", "logo_image", "logo_image_url", "featured_image", "featured_image_url")}), ("Links and technologies", {"fields": ("github_url", "live_url", "technologies")}), ("Display", {"fields": ("order", "is_featured", "is_published")}))


@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = ("position", "company", "employment_type", "start_date", "end_date", "is_visible")
    list_filter = ("employment_type", "is_visible")
    search_fields = ("company", "position", "description")
    ordering = ("order", "-start_date")


@admin.register(Education)
class EducationAdmin(admin.ModelAdmin):
    list_display = ("institution", "degree", "field_of_study", "start_date", "end_date", "is_visible")
    list_filter = ("is_visible",)
    search_fields = ("institution", "degree", "field_of_study")
    ordering = ("order", "-start_date")


@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ("title", "key", "order", "is_visible")
    list_filter = ("is_visible",)
    search_fields = ("title", "key")
    ordering = ("order", "title")


@admin.register(SocialLink)
class SocialLinkAdmin(admin.ModelAdmin):
    list_display = ("platform", "username", "url", "order", "is_visible")
    list_filter = ("is_visible",)
    search_fields = ("platform", "username", "url")


@admin.register(Resume)
class ResumeAdmin(admin.ModelAdmin):
    list_display = ("title", "is_current", "uploaded_at")
    list_filter = ("is_current",)
    readonly_fields = ("uploaded_at",)


@admin.register(Achievement)
class AchievementAdmin(admin.ModelAdmin):
    list_display = ("title", "prize", "date", "grade", "is_visible")
    list_filter = ("grade", "is_visible")
    search_fields = ("title", "description")
    ordering = ("order", "-date")


@admin.register(Certification)
class CertificationAdmin(admin.ModelAdmin):
    list_display = ("title", "issuer", "issue_date", "is_visible")
    list_filter = ("issuer", "is_visible")
    search_fields = ("title", "issuer", "credential_id")


@admin.register(Research)
class ResearchAdmin(admin.ModelAdmin):
    list_display = ("title", "status", "is_visible")
    list_filter = ("status", "is_visible")
    search_fields = ("title", "description")


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ("name", "slug")
    search_fields = ("name",)
    prepopulated_fields = {"slug": ("name",)}


@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    list_display = ("name", "slug")
    search_fields = ("name",)
    prepopulated_fields = {"slug": ("name",)}


@admin.action(description="Publish selected blog posts")
def publish_posts(modeladmin, request, queryset):
    from django.utils import timezone
    queryset.update(status=BlogPost.Status.PUBLISHED, published_at=timezone.now())


@admin.action(description="Unpublish selected blog posts")
def unpublish_posts(modeladmin, request, queryset):
    queryset.update(status=BlogPost.Status.DRAFT)


@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    list_display = ("title", "author", "category", "status", "published_at", "reading_time", "is_featured")
    list_filter = ("status", "category", "is_featured", "published_at")
    search_fields = ("title", "excerpt", "content", "author")
    prepopulated_fields = {"slug": ("title",)}
    filter_horizontal = ("tags",)
    date_hierarchy = "published_at"
    ordering = ("-published_at", "-created_at")
    actions = (publish_posts, unpublish_posts)
    fieldsets = (("Post", {"fields": ("title", "slug", "excerpt", "content", "featured_image")}), ("Organization", {"fields": ("author", "category", "tags", "is_featured")}), ("Publication", {"fields": ("status", "published_at", "reading_time")}))
    readonly_fields = ("reading_time",)
