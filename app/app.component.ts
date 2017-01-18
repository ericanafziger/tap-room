import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <div class="container">
    <h1>Tap Room</h1>
    <div class="card-container">
      <div class="card" *ngFor="let currentKeg of kegs">
        <div class="card-image waves-effect waves-block waves-light">
          <div class="fill-level" [style.height.%]="(currentKeg.quantity/124)*100"></div>
          <img class="activator" src="./resources/img/keg.png">
        </div>
        <div class="card-content">
          <h2 class="card-title">{{currentKeg.name}}
          <span class='card-title activator grey-text text-darken-4'><a (click)="editKeg(currentKeg)" class="btn-floating btn-med waves-effect waves-light red right"><i class="material-icons">mode_edit</i></a></span></h2>
          <p>{{currentKeg.brand}} | {{currentKeg.style}}</p>
          <p>\${{currentKeg.price.toFixed(2)}} | {{currentKeg.abv}}%</p>
          <p>{{currentKeg.quantity}} pints</p>
          <a (click)="subtractPint(currentKeg)" class="btn center waves-effect waves-light blue">pint</a>
          <a (click)="subtractGrowler(currentKeg)" class="btn center waves-effect waves-light green">growler</a>
        </div>
        <div class="card-reveal">
          <span class="card-title grey-text text-darken-4">Card Title<i class="material-icons right">close</i></span>

          <div *ngIf="selectedKeg">
            <input [(ngModel)]="selectedKeg.name">
            <input [(ngModel)]="selectedKeg.brand">
            <input [(ngModel)]="selectedKeg.style">
            <input [(ngModel)]="selectedKeg.price">
            <input [(ngModel)]="selectedKeg.abv">
            <input [(ngModel)]="selectedKeg.description">
            <input [(ngModel)]="selectedKeg.quantity">
            <button (click)="updateKeg()" type="button">Submit</button>
          </div>
        </div>
      </div><!--end of card-->
    </div><!--end of card-container-->



    <h1>Kegs on Order</h1>
    <div class="card" *ngFor="let currentKeg of kegsOnOrder">
      <div class="card-image waves-effect waves-block waves-light">
        <img class="activator" src="./resources/img/keg.png">
      </div>
      <h2>{{currentKeg.name}}</h2>
      <h5>{{currentKeg.brand}} - {{currentKeg.style}}</h5>
      <p>\${{currentKeg.price.toFixed(2)}} | {{currentKeg.abv}}%</p>
      <p>{{currentKeg.quantity}} pints</p>
    </div>
  </div>


  `
})

export class AppComponent {

  kegs: Keg[] = [
    new Keg("Total Domination", "Ninkasi", "IPA", 50, 6.7, 5, "A delightful blend of citrus and floral hop notes dominate the senses while a trio of malt adds a clean finish."),
    new Keg("Vanilla Oatis", "Ninkasi", "Oatmeal Stout", 124, 7, 5, "A divine blend of vanilla, coffee, chocolate, and roasted malt notes swirl together to create a smooth Oatmeal Stout with a crisp finish."),
    new Keg("Milk Stout Nitro", "Left Hand Brewing", "Sweet Stout", 2, 6, 5.5, "Dark & delicious, America’s great milk stout will change your perception about what a stout can be."),
    new Keg("Ripstop Rye Pils", "Base Camp", "Rye Pilsner", 124, 5.7, 4.5, "Aromas of European malt and noble-type hops mingle with a dignified, refreshing, and clean malt character that is further distinguished with a generous addition of spicy rye malt, creating a beer that is at once zesty, crisp, hoppy, and incredibly drinkable."),
    new Keg("Belgian Strong Dark", "Pfriem", "Ale", 124, 10, 6, "This beer has complex flavors of fig dipped in dark chocolate with ripe fruit and toffee."),
    new Keg("Voodoo Doughnut Grape Guerrilla", "Rogue", "Ale", 124, 7.5, 3, "This ale was inspired by the Voodoo Doughnut Grape Ape doughnut, a creation that features vanilla frosting, grape dust and purple sprinkles.")
  ];

  kegsOnOrder : Keg[] = [];
  selectedKeg = null;

  subtractPint(currentKeg) {
    if (currentKeg.quantity > 1) {
      currentKeg.quantity -= 1;
    } else if (currentKeg.quantity === 1) {
      currentKeg.quantity -= 1;
      this.kegs.splice(this.kegs.indexOf(currentKeg), 1);
      this.kegsOnOrder.push(currentKeg);
      alert("this Keg is out of beer!");
    } else {
      alert("this Keg is out of beer!");
    }
  }

  subtractGrowler(currentKeg) {
    if (currentKeg.quantity > 4) {
      currentKeg.quantity -= 4;
    } else if (currentKeg.quantity === 4) {
      currentKeg.quantity -= 4;
      this.kegs.splice(this.kegs.indexOf(currentKeg), 1);
      this.kegsOnOrder.push(currentKeg);
      alert("this Keg is out of beer!");
    } else {
      alert("There is not enough beer for a growler!");
    }
  }

  editKeg(currentKeg) {
    this.selectedKeg = currentKeg;
  }

  updateKeg() {
    this.selectedKeg = null;
  }



}


export class Keg {

  constructor(public name: string, public brand: string, public style: string, public quantity: number, public abv: number, public price: number, public description: string) { }
}
