import math
import re
from django.utils import timezone

from cloudinary.models import CloudinaryField
from django.core.validators import MinValueValidator
from django.db import models
from django.utils.text import slugify


class Profile(models.Model):
    name = models.CharField(max_length=160)
    professional_title = models.CharField(max_length=160)
    short_title = models.CharField(max_length=160, blank=True)
    profile_image = CloudinaryField("image", folder="profile", blank=True, null=True)
    profile_image_url = models.URLField(blank=True)
    email = models.EmailField(blank=True)
    phone = models.CharField(max_length=80, blank=True)
    location = models.CharField(max_length=160, blank=True)
    pronouns = models.CharField(max_length=40, blank=True)
    website = models.URLField(blank=True)
    github_username = models.CharField(max_length=80, blank=True)
    availability = models.CharField(max_length=160, blank=True)
    hero_description = models.CharField(max_length=300, blank=True)
    seo_keywords = models.JSONField(default=list, blank=True)
    timezone = models.CharField(max_length=80, blank=True)
    created_date = models.DateField(null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "site profile"

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.profile_image:
            self.profile_image = None
        if self.pk is None and Profile.objects.exists():
            self.pk = Profile.objects.first().pk
        return super().save(*args, **kwargs)


class AboutSection(models.Model):
    title = models.CharField(max_length=120, default="About")
    content = models.TextField(blank=True)
    short_description = models.TextField(blank=True)
    is_active = models.BooleanField(default=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        if self.is_active:
            AboutSection.objects.exclude(pk=self.pk).update(is_active=False)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title


class Project(models.Model):
    title = models.CharField(max_length=180)
    slug = models.SlugField(unique=True, blank=True)
    short_description = models.TextField(blank=True)
    full_description = models.TextField(blank=True)
    logo_image = CloudinaryField("image", folder="projects/logos", blank=True, null=True)
    logo_image_url = models.URLField(blank=True)
    featured_image = CloudinaryField("image", folder="projects", blank=True, null=True)
    featured_image_url = models.URLField(blank=True)
    technologies = models.JSONField(default=list, blank=True)
    github_url = models.URLField(blank=True)
    live_url = models.URLField(blank=True)
    order = models.PositiveIntegerField(default=0)
    is_featured = models.BooleanField(default=False)
    is_published = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["order", "title"]

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        if not self.logo_image:
            self.logo_image = None
        if not self.featured_image:
            self.featured_image = None
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title


class Experience(models.Model):
    company = models.CharField(max_length=180)
    position = models.CharField(max_length=180)
    location = models.CharField(max_length=180, blank=True)
    employment_type = models.CharField(max_length=80, blank=True)
    start_date = models.DateField(null=True, blank=True)
    end_date = models.DateField(null=True, blank=True)
    currently_working = models.BooleanField(default=False)
    description = models.TextField(blank=True)
    responsibilities = models.JSONField(default=list, blank=True)
    order = models.PositiveIntegerField(default=0)
    is_visible = models.BooleanField(default=True)

    class Meta:
        ordering = ["order", "-start_date"]

    def __str__(self):
        return f"{self.position} — {self.company}"


class Education(models.Model):
    institution = models.CharField(max_length=180)
    degree = models.CharField(max_length=180, blank=True)
    field_of_study = models.CharField(max_length=180, blank=True)
    start_date = models.DateField(null=True, blank=True)
    end_date = models.DateField(null=True, blank=True)
    grade = models.CharField(max_length=100, blank=True)
    description = models.TextField(blank=True)
    skills = models.JSONField(default=list, blank=True)
    order = models.PositiveIntegerField(default=0)
    is_visible = models.BooleanField(default=True)

    class Meta:
        ordering = ["order", "-start_date"]

    def __str__(self):
        return self.institution


class Skill(models.Model):
    key = models.SlugField(max_length=100, unique=True)
    title = models.CharField(max_length=120)
    href = models.URLField(blank=True)
    icon_url = models.URLField(blank=True)
    icon = CloudinaryField("image", folder="skills", blank=True, null=True)
    categories = models.JSONField(default=list, blank=True)
    order = models.PositiveIntegerField(default=0)
    is_visible = models.BooleanField(default=True)

    class Meta:
        ordering = ["order", "title"]

    def save(self, *args, **kwargs):
        if not self.icon:
            self.icon = None
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title


class SocialLink(models.Model):
    platform = models.CharField(max_length=80)
    username = models.CharField(max_length=120, blank=True)
    url = models.URLField()
    icon_url = models.URLField(blank=True)
    order = models.PositiveIntegerField(default=0)
    is_visible = models.BooleanField(default=True)

    class Meta:
        ordering = ["order", "platform"]

    def __str__(self):
        return self.platform


class Resume(models.Model):
    title = models.CharField(max_length=160, default="My Resume")
    file = CloudinaryField("auto", folder="resume", blank=True, null=True)
    external_url = models.URLField(blank=True)
    is_current = models.BooleanField(default=True)
    uploaded_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        if not self.file:
            self.file = None
        if self.is_current:
            Resume.objects.exclude(pk=self.pk).update(is_current=False)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title


class Achievement(models.Model):
    title = models.CharField(max_length=180)
    prize = models.CharField(max_length=120, blank=True)
    date = models.DateField(null=True, blank=True)
    grade = models.CharField(max_length=120, blank=True)
    description = models.TextField(blank=True)
    order = models.PositiveIntegerField(default=0)
    is_visible = models.BooleanField(default=True)

    class Meta:
        ordering = ["order", "-date"]

    def __str__(self):
        return self.title


class Certification(models.Model):
    title = models.CharField(max_length=180)
    issuer = models.CharField(max_length=180, blank=True)
    issue_date = models.DateField(null=True, blank=True)
    credential_id = models.CharField(max_length=120, blank=True)
    credential_url = models.URLField(blank=True)
    order = models.PositiveIntegerField(default=0)
    is_visible = models.BooleanField(default=True)

    class Meta:
        ordering = ["order", "-issue_date"]

    def __str__(self):
        return self.title


class Research(models.Model):
    title = models.CharField(max_length=180)
    status = models.CharField(max_length=100, blank=True)
    description = models.TextField(blank=True)
    order = models.PositiveIntegerField(default=0)
    is_visible = models.BooleanField(default=True)

    class Meta:
        ordering = ["order", "title"]

    def __str__(self):
        return self.title


class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(unique=True, blank=True)

    class Meta:
        verbose_name_plural = "categories"
        ordering = ["name"]

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name


class Tag(models.Model):
    name = models.CharField(max_length=80, unique=True)
    slug = models.SlugField(unique=True, blank=True)

    class Meta:
        ordering = ["name"]

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name


class BlogPost(models.Model):
    class Status(models.TextChoices):
        DRAFT = "DRAFT", "Draft"
        PUBLISHED = "PUBLISHED", "Published"

    title = models.CharField(max_length=220)
    slug = models.SlugField(unique=True, blank=True)
    excerpt = models.TextField(blank=True)
    content = models.TextField(blank=True, help_text="Markdown is supported by the frontend.")
    featured_image = CloudinaryField("image", folder="blog", blank=True, null=True)
    author = models.CharField(max_length=160, blank=True)
    category = models.ForeignKey(Category, null=True, blank=True, on_delete=models.SET_NULL, related_name="posts")
    tags = models.ManyToManyField(Tag, blank=True, related_name="posts")
    status = models.CharField(max_length=12, choices=Status.choices, default=Status.DRAFT)
    published_at = models.DateTimeField(null=True, blank=True)
    reading_time = models.PositiveIntegerField(default=0, validators=[MinValueValidator(0)])
    is_featured = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-published_at", "-created_at"]

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        if not self.author:
            profile = Profile.objects.first()
            self.author = profile.name if profile else ""
        if self.status == self.Status.PUBLISHED and not self.published_at:
            self.published_at = timezone.now()
        if not self.featured_image:
            self.featured_image = None
        if self.content:
            plain_text = re.sub(r"<[^>]+>", " ", self.content)
            self.reading_time = max(1, math.ceil(len(re.findall(r"\w+", plain_text)) / 200))
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title
