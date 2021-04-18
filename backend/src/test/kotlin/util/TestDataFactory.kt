package util

import com.google.gson.Gson
import dev.rfj.datasti.container.api.Container
import dev.rfj.datasti.data.api.Datapoint
import dev.rfj.datasti.user.api.User
import org.apache.commons.lang3.RandomStringUtils
import org.apache.commons.lang3.RandomStringUtils.*
import java.lang.System.currentTimeMillis

fun randomContainers(): Set<Container> {
    return setOf(
            randomContainer(),
            randomContainer(),
            randomContainer(),
            randomContainer()
    )
}

fun randomContainerForUser(user: String): Container {
    return randomContainer().copy(userId = user)
}

fun randomContainer(): Container {
    val randomName = randomAlphanumeric(100)
    val randomDescription = randomAlphanumeric(200)
    val randomImage = randomAlphabetic(200)
    val randomUser = randomAlphabetic(50)

    return Container(
            randomName,
            randomDescription,
            randomImage,
            randomUser
    )
}

fun randomDataPoints(): List<Datapoint> {
    return listOf(
            randomDatapoint(),
            randomDatapoint(),
            randomDatapoint()
    )
}

fun randomDatapoint(): Datapoint {
    val randomId = randomAlphanumeric(100)
    val randomTimestamp = currentTimeMillis()
    val randomValue = randomNumeric(10)
    val randomLabel = randomAlphabetic(15)

    return Datapoint(
            randomId,
            randomTimestamp,
            randomValue,
            randomLabel
    )
}

fun randomUser(): User {
    return User(
            firstname = randomAlphanumeric(100),
            lastname = randomAlphanumeric(100),
            username = randomAlphanumeric(100),
            password = randomAlphanumeric(100)
    )
}

fun Any.toJson(): String {
    return Gson().toJson(this)
}
