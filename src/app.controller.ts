import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";
import { SkipThrottle, Throttle } from "@nestjs/throttler";

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) { }

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }

    @SkipThrottle({ short: true, medium: true, long: false })
    @Get('hi') 
    getHi() {
        return this.appService.getHello();
    }
}