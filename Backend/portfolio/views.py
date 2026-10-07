from django.db.models import Q, Subquery
from django.utils import timezone
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import AboutSection, Achievement, BlogPost, Category, Certification, Education, Experience, Profile, Project, Research, Resume, Skill, SocialLink, Tag
from .pagination import BlogPagination
from .serializers import AboutSerializer, AchievementSerializer, BlogPostSerializer, CategorySerializer, CertificationSerializer, EducationSerializer, ExperienceSerializer, ProfileSerializer, ProjectSerializer, ResearchSerializer, ResumeSerializer, SkillSerializer, SocialLinkSerializer, TagSerializer


class FirstRecordView(APIView):
    model = None
    serializer_class = None

    def get(self, request):
        instance = self.model.objects.first()
        if not instance:
            return Response(None)
        return Response(self.serializer_class(instance, context={"request": request}).data)


class ProfileView(FirstRecordView):
    model, serializer_class = Profile, ProfileSerializer


class AboutView(FirstRecordView):
    model, serializer_class = AboutSection, AboutSerializer

    def get(self, request):
        instance = self.model.objects.filter(is_active=True).first()
        if not instance:
            return Response(None)
        return Response(self.serializer_class(instance, context={"request": request}).data)


class ResumeView(FirstRecordView):
    model, serializer_class = Resume, ResumeSerializer

    def get(self, request):
        instance = self.model.objects.filter(is_current=True).first()
        if not instance:
            return Response(None)
        return Response(self.serializer_class(instance, context={"request": request}).data)


class PortfolioBundleView(APIView):
    def get(self, request):
        ctx = {"request": request}
        profile = Profile.objects.first()
        about = AboutSection.objects.filter(is_active=True).first()
        resume = Resume.objects.filter(is_current=True).first()

        profile_github_username = Profile.objects.order_by("pk").values("github_username")[:1]
        social_links = SocialLink.objects.filter(is_visible=True).annotate(
            profile_github_username=Subquery(profile_github_username)
        )

        return Response({
            "profile": ProfileSerializer(profile, context=ctx).data if profile else None,
            "about": AboutSerializer(about, context=ctx).data if about else None,
            "resume": ResumeSerializer(resume, context=ctx).data if resume else None,
            "skills": SkillSerializer(Skill.objects.filter(is_visible=True), many=True, context=ctx).data,
            "social_links": SocialLinkSerializer(social_links, many=True, context=ctx).data,
            "experience": ExperienceSerializer(Experience.objects.filter(is_visible=True), many=True, context=ctx).data,
            "education": EducationSerializer(Education.objects.filter(is_visible=True), many=True, context=ctx).data,
            "projects": ProjectSerializer(Project.objects.filter(is_published=True), many=True, context=ctx).data,
            "achievements": AchievementSerializer(Achievement.objects.filter(is_visible=True), many=True, context=ctx).data,
            "certifications": CertificationSerializer(Certification.objects.filter(is_visible=True), many=True, context=ctx).data,
            "research": ResearchSerializer(Research.objects.filter(is_visible=True), many=True, context=ctx).data,
        })



class ProjectListView(generics.ListAPIView):
    serializer_class = ProjectSerializer
    pagination_class = None

    def get_queryset(self):
        queryset = Project.objects.filter(is_published=True)
        featured = self.request.query_params.get("featured")
        if featured is not None:
            queryset = queryset.filter(is_featured=featured.lower() == "true")
        return queryset


class ProjectDetailView(generics.RetrieveAPIView):
    serializer_class = ProjectSerializer
    lookup_field = "slug"
    queryset = Project.objects.filter(is_published=True)


class ExperienceListView(generics.ListAPIView):
    serializer_class = ExperienceSerializer
    queryset = Experience.objects.filter(is_visible=True)
    pagination_class = None


class EducationListView(generics.ListAPIView):
    serializer_class = EducationSerializer
    queryset = Education.objects.filter(is_visible=True)
    pagination_class = None


class SkillListView(generics.ListAPIView):
    serializer_class = SkillSerializer
    queryset = Skill.objects.filter(is_visible=True)
    pagination_class = None


class SocialLinkListView(generics.ListAPIView):
    serializer_class = SocialLinkSerializer
    pagination_class = None

    def get_queryset(self):
        profile_github_username = Profile.objects.order_by("pk").values("github_username")[:1]
        return SocialLink.objects.filter(is_visible=True).annotate(
            profile_github_username=Subquery(profile_github_username)
        )


class AchievementListView(generics.ListAPIView):
    serializer_class = AchievementSerializer
    queryset = Achievement.objects.filter(is_visible=True)
    pagination_class = None


class CertificationListView(generics.ListAPIView):
    serializer_class = CertificationSerializer
    queryset = Certification.objects.filter(is_visible=True)
    pagination_class = None


class ResearchListView(generics.ListAPIView):
    serializer_class = ResearchSerializer
    queryset = Research.objects.filter(is_visible=True)
    pagination_class = None


class CategoryListView(generics.ListAPIView):
    serializer_class = CategorySerializer
    pagination_class = None

    def get_queryset(self):
        return Category.objects.filter(posts__status=BlogPost.Status.PUBLISHED, posts__published_at__lte=timezone.now()).distinct()


class TagListView(generics.ListAPIView):
    serializer_class = TagSerializer
    pagination_class = None

    def get_queryset(self):
        return Tag.objects.filter(posts__status=BlogPost.Status.PUBLISHED, posts__published_at__lte=timezone.now()).distinct()


class BlogPostListView(generics.ListAPIView):
    serializer_class = BlogPostSerializer
    pagination_class = BlogPagination

    def get_queryset(self):
        queryset = BlogPost.objects.filter(status=BlogPost.Status.PUBLISHED, published_at__lte=timezone.now()).select_related("category").prefetch_related("tags")
        category = self.request.query_params.get("category")
        tag = self.request.query_params.get("tag")
        search = self.request.query_params.get("search")
        if category:
            queryset = queryset.filter(category__slug=category)
        if tag:
            queryset = queryset.filter(tags__slug=tag)
        if search:
            queryset = queryset.filter(Q(title__icontains=search) | Q(excerpt__icontains=search) | Q(content__icontains=search))
        return queryset.distinct()


class BlogPostDetailView(generics.RetrieveAPIView):
    serializer_class = BlogPostSerializer
    lookup_field = "slug"

    def get_queryset(self):
        return BlogPost.objects.filter(status=BlogPost.Status.PUBLISHED, published_at__lte=timezone.now()).select_related("category").prefetch_related("tags")
