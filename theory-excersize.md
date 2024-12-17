1. Que problemas detectas en la operación y razona la respuesta.

Al inspeccionar la clase RegisteredUsers y la operación getTotal(), puedo identificar unos cuantos problemas.

1. Viola el principio Open/Closed de SOLID, que dice que el código debe de ser abierto a extension pero cerrado a modificación, en este caso, al añadir otro tipo de servicio, debe de modificarse directamente el if/if else.

2. Viola el principio de Single Responsibility de SOLID: La clase ```RegisteredUser``` es responsable de calcular precios, que en mi opinion debe de ser responsabilidad de la clase service.

3. Checkeo con el uso de ```typeof``` que puede tener un comportamiento no esperado, en particular que ```typeof null```es ```object```y podría causar errores al haber una equivalencia ```==``` en el código.

4. Alto acoplamiento, la clase ```RegisteredUser```sabe detalles de implementacion acerca de la clase ```Service```(en particular sus propiedades)

Como alternativa, podemos utilizar el patrón de diseño Strategy y usar polimorfismo. La propuesta es mover la lógica de calcular el precio a sus respectivas clases.

```
class Service {
    constructor(multimediaContent) {
        this.multimediaContent = multimediaContent;
    }

    getPrice() {
        throw new Error("Method 'getPrice()' must be implemented.");
    }
}

class StreamingService extends Service {
    getPrice() {
        return this.multimediaContent.getStreamingPrice();
    }
}

class DownloadService extends Service {
    getPrice() {
        return this.multimediaContent.getDownloadPrice();
    }
}
```

```
class MultimediaContent {
    constructor(streamingPrice, downloadPrice) {
        this.streamingPrice = streamingPrice;
        this.downloadPrice = downloadPrice;
    }

    getStreamingPrice() {
        return this.streamingPrice;
    }

    getDownloadPrice() {
        return this.downloadPrice;
    }
}

class PremiumContent extends MultimediaContent {
    constructor(streamingPrice, downloadPrice, additionalFee) {
        super(streamingPrice, downloadPrice);
        this.additionalFee = additionalFee;
    }

    getStreamingPrice() {
        return super.getStreamingPrice() + this.additionalFee;
    }

    getDownloadPrice() {
        return super.getDownloadPrice() + this.additionalFee;
    }
}
```

```
class RegisteredUser {
    constructor(services = []) {
        this.services = services;
    }

    getTotal() {
        return this.services.reduce((total, service) => total + service.getPrice(), 0);
    }
}
```

