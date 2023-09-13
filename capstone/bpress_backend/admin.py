from django.contrib import admin

from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

from .models import *

class UserProfileInline(admin.StackedInline):
    model = UserProfile
    can_delete = False

# Define a new User admin
class UserAdmin(BaseUserAdmin):
    inlines = (UserProfileInline,)

admin.site.register(User, UserAdmin)
admin.site.register(Supervision)
admin.site.register(Measurement)
admin.site.register(Message)
