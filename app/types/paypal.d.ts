declare module '@paypal/checkout-server-sdk' {
  namespace core {
    class PayPalHttpClient {
      constructor(environment: any)
      execute(request: any): Promise<any>
    }
    
    class LiveEnvironment {
      constructor(clientId: string, clientSecret: string)
    }
    
    class SandboxEnvironment {
      constructor(clientId: string, clientSecret: string)
    }
  }
  
  namespace orders {
    class OrdersCreateRequest {
      prefer(preference: string): void
      requestBody(body: any): void
    }
  }
} 