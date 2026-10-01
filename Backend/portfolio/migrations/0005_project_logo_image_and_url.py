from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("portfolio", "0004_remove_experience_skills"),
    ]

    operations = [
        migrations.AddField(
            model_name="project",
            name="logo_image",
            field=models.ImageField(blank=True, upload_to="projects/logos/"),
        ),
        migrations.AddField(
            model_name="project",
            name="logo_image_url",
            field=models.URLField(blank=True),
        ),
    ]
