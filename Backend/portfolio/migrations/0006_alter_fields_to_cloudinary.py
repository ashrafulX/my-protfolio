import cloudinary.models
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("portfolio", "0005_project_logo_image_and_url"),
    ]

    operations = [
        migrations.AlterField(
            model_name="profile",
            name="profile_image",
            field=cloudinary.models.CloudinaryField(
                blank=True, max_length=255, null=True, verbose_name="image"
            ),
        ),
        migrations.AlterField(
            model_name="project",
            name="logo_image",
            field=cloudinary.models.CloudinaryField(
                blank=True, max_length=255, null=True, verbose_name="image"
            ),
        ),
        migrations.AlterField(
            model_name="project",
            name="featured_image",
            field=cloudinary.models.CloudinaryField(
                blank=True, max_length=255, null=True, verbose_name="image"
            ),
        ),
        migrations.AlterField(
            model_name="skill",
            name="icon",
            field=cloudinary.models.CloudinaryField(
                blank=True, max_length=255, null=True, verbose_name="image"
            ),
        ),
        migrations.AlterField(
            model_name="resume",
            name="file",
            field=cloudinary.models.CloudinaryField(
                blank=True, max_length=255, null=True, verbose_name="auto"
            ),
        ),
        migrations.AlterField(
            model_name="blogpost",
            name="featured_image",
            field=cloudinary.models.CloudinaryField(
                blank=True, max_length=255, null=True, verbose_name="image"
            ),
        ),
    ]

