package dev.rfj.datasti.rest

import dev.rfj.datasti.container.api.Container
import dev.rfj.datasti.container.api.ContainerService
import dev.rfj.datasti.data.api.DataService
import dev.rfj.datasti.data.api.Datapoint
import dev.rfj.datasti.error.ContainerNotFoundException
import dev.rfj.datasti.error.NameConflictException
import dev.rfj.datasti.error.UserUnknownException
import javax.annotation.security.RolesAllowed
import javax.enterprise.context.RequestScoped
import javax.ws.rs.*
import javax.ws.rs.core.Context
import javax.ws.rs.core.MediaType
import javax.ws.rs.core.Response
import javax.ws.rs.core.SecurityContext

@Path("/container")
@RequestScoped
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
class ContainerResource(
        private val containerService: ContainerService,
        private val dataService: DataService
) {

    @GET
    @RolesAllowed("User")
    fun getAllContainers(@Context securityContext: SecurityContext): Response {

        val user = getUserPrinciple(securityContext) ?: return Response.status(401).build()

        return try {
            val container = containerService.findByUserId(user)
            Response.ok(container).build()
        } catch (ex: UserUnknownException) {
            Response.status(403).build()
        }
    }

    @POST
    @RolesAllowed("User")
    fun createContainer(
            @Context securityContext: SecurityContext,
            requestBody: Container?): Response {

        val input = requestBody ?: return Response.status(400).build()

        val user = getUserPrinciple(securityContext) ?: return Response.status(401).build()

        val container = input.copy(userId = user)

        return try {
            containerService.create(container)
            Response.status(201).build()
        } catch (e: UserUnknownException) {
            Response.status(403).build()
        } catch (e: NameConflictException) {
            Response.status(409).build()
        }
    }

    private fun getUserPrinciple(securityContext: SecurityContext): String? {
        return securityContext.userPrincipal?.name
    }

    @GET
    @Path("/{containerName}")
    @RolesAllowed("User")
    fun getDataForContainer(
            @Context securityContext: SecurityContext,
            @PathParam("containerName") nameParam: String?
    ): Response {

        val containerName = nameParam ?: return Response.status(400).build()
        val user = getUserPrinciple(securityContext) ?: return Response.status(401).build()

        val container = Container(
                name = containerName,
                userId = user
        )

        return try {
            Response.ok(dataService.getData(container)).build()
        } catch (e: UserUnknownException) {
            Response.status(403).build()
        } catch (e: ContainerNotFoundException) {
            Response.status(404).build()
        }
    }

    @POST
    @Path("/{containerName}")
    @Consumes(MediaType.APPLICATION_JSON)
    @RolesAllowed("User")
    fun createDatapoint(
            @Context securityContext: SecurityContext,
            @PathParam("containerName") nameParam: String?,
            datapoint: Datapoint?
    ): Response {

        val containerName = nameParam ?: return Response.status(400).build()
        val user = getUserPrinciple(securityContext) ?: return Response.status(401).build()
        val data = datapoint ?: return Response.status(400).build()

        val container = Container(
                name = containerName,
                userId = user
        )

        return try {
            Response.status(201)
                    .entity(dataService.add(data.copy(id = ""), container))
                    .build()
        } catch (e: UserUnknownException) {
            Response.status(403).build()
        } catch (e: ContainerNotFoundException) {
            Response.status(404).build()
        }
    }

    @POST
    @Path("/{containerName}/{label}")
    @Consumes(MediaType.APPLICATION_JSON)
    @RolesAllowed("User")
    fun createDatapointWithLabel(
            @Context securityContext: SecurityContext,
            @PathParam("containerName") nameParam: String?,
            @PathParam("label") labelName: String?,
            dataInput: Datapoint?
    ): Response {

        val containerName = nameParam ?: return Response.status(400).build()
        val user = getUserPrinciple(securityContext) ?: return Response.status(401).build()
        val data = dataInput ?: return Response.status(400).build()

        val container = Container(
                name = containerName,
                userId = user
        )

        val datapoint = data.copy(
                id = "",
                label = labelName ?: data.label
        )

        return try {
            Response.status(201)
                    .entity(dataService.add(datapoint, container))
                    .build()
        } catch (e: UserUnknownException) {
            Response.status(403).build()
        } catch (e: ContainerNotFoundException) {
            Response.status(404).build()
        }
    }

    @POST
    @Path("/{containerName}")
    @Consumes(MediaType.TEXT_PLAIN)
    @RolesAllowed("User")
    fun createPlainDataPoint(
            @Context securityContext: SecurityContext,
            @PathParam("containerName") nameParam: String?,
            dataInput: String?
    ): Response {

        val containerName = nameParam ?: return Response.status(400).build()
        val user = getUserPrinciple(securityContext) ?: return Response.status(401).build()
        val data = dataInput ?: return Response.status(400).build()

        val dataPoint = Datapoint()
        dataPoint.value = data

        val container = Container(
                name = containerName,
                userId = user
        )

        return try {
            Response.status(201)
                    .entity(dataService.add(dataPoint, container))
                    .build()
        } catch (e: UserUnknownException) {
            Response.status(403).build()
        } catch (e: ContainerNotFoundException) {
            Response.status(404).build()
        }
    }

    @POST
    @Path("/{containerName}/{label}")
    @Consumes(MediaType.TEXT_PLAIN)
    @RolesAllowed("User")
    fun createPlainDataPointWithLabel(
            @Context securityContext: SecurityContext,
            @PathParam("containerName") nameParam: String?,
            @PathParam("label") labelInput: String?,
            dataInput: String?
    ): Response {

        val containerName = nameParam ?: return Response.status(400).build()
        val user = getUserPrinciple(securityContext) ?: return Response.status(401).build()
        val data = dataInput ?: return Response.status(400).build()

        val dataPoint = Datapoint()
        dataPoint.value = data
        dataPoint.label = labelInput ?: ""

        val container = Container(
                name = containerName,
                userId = user
        )

        return try {
            Response.status(201)
                    .entity(dataService.add(dataPoint, container))
                    .build()
        } catch (e: UserUnknownException) {
            Response.status(403).build()
        } catch (e: ContainerNotFoundException) {
            Response.status(404).build()
        }
    }
}
