from rest_framework import routers
from core.user.viewsets import UserViewSet


router = routers.SimpleRouter()

# User

router.register(r'user', UserViewSet, basename='user')

urlpatterns = [
    *router.urls,
]
