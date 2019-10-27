import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router'
import {AuthenticationService} from '../services/authentication.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginUserData = {}
  jwt = new JwtHelperService;
  message :  any;
  nom :  any;
  prenom :  any;
  imageName : any;
  roles :any
  valuRole= false;

constructor(private _auth:AuthenticationService,
    private _router: Router) { }

  ngOnInit() {
  }

  onLogin(user) {
    console.log(user);
  }

  loginUser () {
    
    this._auth.loginUser(this.loginUserData)
    .subscribe(
      res => { 
          console.log(res);
           if(!res.code){
          localStorage.setItem('token', res.token);
          const Decode=this.jwt.decodeToken(res.token);
          localStorage.setItem('username', Decode.username);
          localStorage.setItem('roles', Decode.roles[0]);
          localStorage.setItem('nom', Decode.nom);
          localStorage.setItem('prenom', Decode.prenom);
          localStorage.setItem('expiration', Decode.exp);
          localStorage.setItem('imageName', Decode.imageName);
          this.prenom= res.prenom;
          this.imageName= res.imageName;
          this.nom= res.nom;
          this.roles= res.roles;
          this.authenticate();
          //this._router.navigate(['/accueil']);
          //window.location.reload()
        }else{
          localStorage.setItem('message',res.message);
          this.message = res.message;
        }
            
      },
      err => console.log('err' ,err.message)
    ) 
  }
  isAuthenticate(){
    console.log('ceci est un test', this.roles)

    return !this.roles && (this.roles=="ROLE_SUPER")
  }

  authenticate() {
    if(this.roles){
      this.valuRole = true;
    }
    else{
      this.valuRole = false;
    }
    return this.valuRole;
  }
}

