import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutRoutingModule } from './layout.routing.module';
import { LayoutComponent } from './layout/layout.component';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { NZ_CONFIG, NzConfig, NzConfigService } from 'ng-zorro-antd/core/config';
import { en_US, provideNzI18n } from "ng-zorro-antd/i18n";
import { NzMessageModule } from 'ng-zorro-antd/message';


export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

const ngZorroConfig: NzConfig = {
  message: {
    nzDirection: "rtl",
    nzMaxStack: 2,
    nzAnimate: true,
    nzPauseOnHover: true,
  },
};


@NgModule({
  declarations: [LayoutComponent],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    NzMessageModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
      defaultLanguage: "fa",
    }),
  ],
  providers: [
    NzConfigService,
    provideNzI18n(en_US),
    {
      provide: NZ_CONFIG,
      useValue: ngZorroConfig,
    },
  ]
})
export class LayoutModule { }
