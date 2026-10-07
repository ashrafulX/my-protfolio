from django.urls import path

from .views import (
    AboutView, AchievementListView, BlogPostDetailView, BlogPostListView,
    CategoryListView, CertificationListView, EducationListView, ExperienceListView,
    PortfolioBundleView, ProfileView, ProjectDetailView, ProjectListView,
    ResearchListView, ResumeView, SkillListView, SocialLinkListView, TagListView
)

urlpatterns = [
    path("all/", PortfolioBundleView.as_view()),
    path("profile/", ProfileView.as_view()),

    path("about/", AboutView.as_view()),
    path("projects/", ProjectListView.as_view()),
    path("projects/<slug:slug>/", ProjectDetailView.as_view()),
    path("experience/", ExperienceListView.as_view()),
    path("education/", EducationListView.as_view()),
    path("skills/", SkillListView.as_view()),
    path("social-links/", SocialLinkListView.as_view()),
    path("resume/", ResumeView.as_view()),
    path("achievements/", AchievementListView.as_view()),
    path("certifications/", CertificationListView.as_view()),
    path("research/", ResearchListView.as_view()),
    path("blog/posts/", BlogPostListView.as_view()),
    path("blog/posts/<slug:slug>/", BlogPostDetailView.as_view()),
    path("blog/categories/", CategoryListView.as_view()),
    path("blog/tags/", TagListView.as_view()),
]
