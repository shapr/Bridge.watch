from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import *
from .serializers import *
from django_pandas.io import read_frame
from django.http import HttpResponse

# Create your views here.

# exclude Tunnel=18, Culvert=19, Other=00
bridges_only = (
    Bridge.objects.exclude(structure_type__in=["00", "18", "19"])
)

@api_view(["GET"])
def national_bridges_location_and_field(request):

    if request.method == "GET":
        # base query
        fields = []
        bridges = bridges_only

        # TODO: More general way of retrieving query params?
        # Store as dictionary, then parse into:
        # base plot type
        # boolean params (columns to include)
        # filter params (lists or single values?)

        # base type of plot
        plot_type = request.query_params.get("plot_type")
        if plot_type == "rating":
            bridges = bridges.exclude(lowest_rating__isnull=True)
            # fields.append("lowest_rating__rating")
        elif plot_type == "year_built":
            bridges.exclude(year_built__isnull=True)
            fields.append("year_built")
        else:
            raise ValueError("Invalid plot type provided")

        # boolean field retrieval
        # TODO: Generalize retrieval
        rating = request.query_params.get("rating")
        if rating == "True":
            fields.append("rating")

        column_limits = []# fields
        column_limits.extend(["latitude", "longitude", "lowest_rating__code"])
        bridges = bridges.values(*column_limits)

        # limit query results for troubleshooting
        limit = request.query_params.get("limit")
        if (limit != None):
            num_limit = int(limit)
            bridges = bridges[:num_limit]

        df = read_frame(bridges, fieldnames=["latitude", "longitude", "lowest_rating__code"])
        print(df)
        # content = BridgeLocationFieldSerializer(bridges, fields=set(fields), many=True)
        return Response("")

    else:
        return Response("", status=status.HTTP_400_BAD_REQUEST)

@api_view(["GET"])
def national_bridges_lf_serialized(request):

    if request.method == "GET":
        # base query
        fields = []
        bridges = bridges_only

        # TODO: More general way of retrieving query params?
        # Store as dictionary, then parse into:
        # base plot type
        # boolean params (columns to include)
        # filter params (lists or single values?)

        # base type of plot
        plot_type = request.query_params.get("plot_type")
        if plot_type == "rating":
            bridges.exclude(lowest_rating__isnull=True)
            fields.append("lowest_rating__code")
        elif plot_type == "year_built":
            bridges.exclude(year_built__isnull=True)
            fields.append("year_built")
        else:
            raise ValueError("Invalid plot type provided")

        # boolean field retrieval
        # TODO: Generalize retrieval
        rating = request.query_params.get("rating")
        if rating == "True":
            fields.append("rating")

        column_limits = fields
        column_limits.extend(["latitude", "longitude"])
        bridges = bridges.values(*column_limits)

        # limit query results for troubleshooting
        limit = request.query_params.get("limit")
        if (limit != None):
            num_limit = int(limit)
            bridges = bridges[:num_limit]

        content = BridgeLocationSerializer(bridges, many=True)
        return Response(content.data)

    else:
        return Response("", status=status.HTTP_400_BAD_REQUEST)

@api_view(["GET"])
def national_bridges_csv(request):

    if request.method == "GET":
        # base query
        fields = []
        bridges = bridges_only
        # bridges = AbbrevBridges.objects.all()

        # todo: more general way of retrieving query params?
        # store as dictionary, then parse into:
        # base plot type
        # boolean params (columns to include)
        # filter params (lists or single values?)

        # base type of plot
        plot_type = request.query_params.get("plot_type")
        if plot_type == "rating":
            bridges.exclude(lowest_rating__isnull=True)
            fields.append("lowest_rating__code")
        elif plot_type == "year_built":
            bridges.exclude(year_built__isnull=True)
            fields.append("year_built")
        else:
            raise ValueError("invalid plot type provided")

        # boolean field retrieval
        # todo: generalize retrieval
        rating = request.query_params.get("rating")
        if rating == "True":
            fields.append("rating")

        column_limits = fields
        column_limits.extend(["latitude", "longitude"])
        bridges = bridges.values_list(*column_limits)

        # limit query results for troubleshooting
        limit = request.query_params.get("limit")
        if (limit != None):
            num_limit = int(limit)
            bridges = bridges[:num_limit]

        df = read_frame(bridges, fieldnames=column_limits)
        df.rename(columns={'lowest_rating__code': 'rating'}, inplace=True)
        response = HttpResponse(content_type='text/csv')
        df.to_csv(path_or_buf=response, index=False)
        return response
    else:
        return Response("", status=status.HTTP_400_BAD_REQUEST)