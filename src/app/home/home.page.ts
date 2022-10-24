import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  pergunta: string;
  resposta: string;
  exibir: boolean;
  timeout: any;
  time: number

  constructor(private http: HttpClient) { }

  ngOnInit(){
    this.solicitarCharada();
  }

  solicitarCharada() {
    const url = 'http://lucasreno.kinghost.net/charada'
    this.http.get(url).subscribe(resultado => {
      this.pergunta = resultado[0]["pergunta"];
      this.resposta = resultado[0]["resposta"];
      this.exibirResposta();
    });
  }

  exibirResposta() {
    this.exibir = false;
    clearInterval(this.timeout);
    this.time = 15;
    this.timeout = setInterval(() => {
      this.time -= 1;
      if (this.time <= 0) {
        this.exibir = true;
        clearInterval(this.timeout);
      }
    }, 1000);
  }
}
