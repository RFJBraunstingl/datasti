package dev.rfj.datasti.container.api

import io.quarkus.runtime.annotations.RegisterForReflection
import org.bson.Document

/**
 * a container for data
 *
 * In datasti, data is collected in containers
 * a container is simply a collection of zero or more datapoints
 * and is uniquely identified by it's name
 */
@RegisterForReflection
data class Container(
        var name: String,
        var description: String,
        var iconUrl: String,
        var userId: String
) {
    constructor(): this("", "", "", "")

    constructor(name: String, userId: String): this(name, "", "", userId)
}

fun Document.toContainer(): Container {
    return Container(
            getString("name"),
            getString("description"),
            getString("image"),
            getString("user")
    )
}

fun Container.toDocument(): Document {
    return Document()
            .append("name", name)
            .append("description", description)
            .append("image", iconUrl)
            .append("user", userId)
}
