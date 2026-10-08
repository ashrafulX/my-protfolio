from django.db import migrations, models


def seed_overview_fields(apps, schema_editor):
    Profile = apps.get_model("portfolio", "Profile")
    profile = Profile.objects.first()
    if profile:
        profile.company = "SoftZen IT"
        profile.company_website = "https://softzenit.com"
        profile.secondary_job_title = "Computer Science Student"
        profile.secondary_job_company = "Northern University Bangladesh"
        profile.secondary_job_website = "https://nub.ac.bd"
        profile.secondary_phone = profile.phone or "+8801590-026285"
        profile.secondary_phone_label = "WhatsApp"
        profile.flip_sentences = [
            profile.professional_title or "Software Engineer",
            "Full Stack Web Developer",
            "Competitive Programmer",
            "CSE Undergraduate",
        ]
        profile.save()


def reverse_func(apps, schema_editor):
    pass


class Migration(migrations.Migration):

    dependencies = [
        ("portfolio", "0007_seed_resume_data"),
    ]

    operations = [
        migrations.AddField(
            model_name="profile",
            name="company",
            field=models.CharField(blank=True, default="", help_text="Current company name, e.g. SoftZen IT", max_length=160),
        ),
        migrations.AddField(
            model_name="profile",
            name="company_website",
            field=models.URLField(blank=True, default="", help_text="Company website URL"),
        ),
        migrations.AddField(
            model_name="profile",
            name="secondary_job_title",
            field=models.CharField(blank=True, default="", help_text="Second position/focus, e.g. Computer Science Student", max_length=160),
        ),
        migrations.AddField(
            model_name="profile",
            name="secondary_job_company",
            field=models.CharField(blank=True, default="", help_text="Institution or organization, e.g. Northern University Bangladesh", max_length=160),
        ),
        migrations.AddField(
            model_name="profile",
            name="secondary_job_website",
            field=models.URLField(blank=True, default="", help_text="Institution website URL"),
        ),
        migrations.AddField(
            model_name="profile",
            name="secondary_phone",
            field=models.CharField(blank=True, default="", help_text="Secondary contact phone or WhatsApp", max_length=80),
        ),
        migrations.AddField(
            model_name="profile",
            name="secondary_phone_label",
            field=models.CharField(blank=True, default="WhatsApp", help_text="Label for secondary phone, e.g. WhatsApp, Dubai, UAE", max_length=80),
        ),
        migrations.AddField(
            model_name="profile",
            name="flip_sentences",
            field=models.JSONField(blank=True, default=list, help_text="Rotating title sentences shown in header"),
        ),
        migrations.RunPython(seed_overview_fields, reverse_func),
    ]
