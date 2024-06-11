from django.contrib import admin
from .models import Service, Advantage, Category, Testimonial, Project, News, Employee, Banner, SiteSetting


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ('title', 'subtitle')
    search_fields = ('title', 'subtitle')
    list_filter = ('title',)


@admin.register(Advantage)
class AdvantageAdmin(admin.ModelAdmin):
    list_display = ('title',)
    search_fields = ('title',)


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('title',)
    search_fields = ('title',)
    list_filter = ('title',)


@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ('name', 'profession')
    search_fields = ('name', 'profession')
    list_filter = ('profession',)


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'client', 'location', 'type')
    search_fields = ('title', 'client', 'location', 'type')
    list_filter = ('client', 'location', 'type')


@admin.register(News)
class NewsAdmin(admin.ModelAdmin):
    list_display = ('title', 'author')
    search_fields = ('title', 'author')
    list_filter = ('author',)


@admin.register(Employee)
class EmployeeAdmin(admin.ModelAdmin):
    list_display = ('name', 'profession', 'phone_number')
    search_fields = ('name', 'profession', 'phone_number')
    list_filter = ('profession',)


@admin.register(Banner)
class BannerAdmin(admin.ModelAdmin):
    list_display = ('title',)
    search_fields = ('title',)
    list_filter = ('title',)


admin.site.register(SiteSetting)
