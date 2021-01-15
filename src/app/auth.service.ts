import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";

@Injectable()
export class AuthService implements CanActivate {

    private token = ''
    username = ''
    useremail = ''
    profilepic = ''
    role = ''

    constructor (private http: HttpClient, private router: Router, private route: ActivatedRoute) {}

    fbLogin() {

        this.token = ''
        window.open('https://gohts-recipebook.herokuapp.com/auth/facebook',"mywindow","location=1,status=1,scrollbars=1, width=800,height=800");
        window.addEventListener('message', (message) => {
            this.token = message.data.token
            this.username = message.data.user.name
            this.useremail = message.data.user.email
            this.profilepic = message.data.user.avatar
            this.role = message.data.user.role

            if (this.token != '')
                {
                    const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
                    this.router.navigateByUrl(returnUrl);
                }
        });

    }

    isLogin() {
        return this.token != ''
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        
        if (this.isLogin()) 
            return true
            
        // return this.router.parseUrl('/login')
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;

    }
}