import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../model/Usuario';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  usuario: Usuario = new Usuario();
  confirmarSenha: string;

  txtEmail = (<HTMLDivElement>document.querySelector('#usuario'))

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    window.scroll (0,0);
  }

  confirmSenha(event: any){
    this.confirmarSenha = event.target.value;
  }

  validaEmail() {
    let regex = /.+\@.+\..+/
    if(this.usuario.usuario.match(regex)) {
      let txtEmail = (<HTMLDivElement>document.querySelector('#usuario'))
      txtEmail.classList.remove("is-invalid");
      txtEmail.classList.add("is-valid")
    } else {
      let txtEmail = (<HTMLDivElement>document.querySelector('#usuario'))
      txtEmail.classList.remove("is-valid");
      txtEmail.classList.add("is-invalid");
    }
  }

  cadastrar(){
    if(this.usuario.senha != this.confirmarSenha){
      alert("A senha está incorreta!");
    }else {
      this.authService.cadastrar(this.usuario).subscribe((resp: Usuario) => {
        this.usuario = resp
        this.router.navigate(["/login"])
        alert("Usuário cadastrado com sucesso!")
      });
    }
  }
}
