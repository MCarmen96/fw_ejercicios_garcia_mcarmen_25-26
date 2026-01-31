import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Housing } from '../services/housing';
import { HousingLocationInfo } from '../interfaces/housinglocation';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-details',
  imports: [ReactiveFormsModule],
  templateUrl: './details.html',
  styleUrl: './details.css',
})
export class Details {
  route: ActivatedRoute = inject(ActivatedRoute);
  housingService = inject(Housing);
  housingLocation: HousingLocationInfo | undefined;


  private readonly changeDetectorRef = inject(ChangeDetectorRef);

  applyForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
  });



  housingLocationId: number = 0;

  /* constructor() {
    this.housingLocationId = Number(this.route.snapshot.params['id']);

    } */

  constructor() {
    this.housingService.
      getHousingLocationById(this.housingLocationId)
      .then((housingLocation) => {
        this.housingLocation = housingLocation;
        this.changeDetectorRef.markForCheck();
        //notifica a Angular un cambio.
      });
  }



  submitApplication() {
    this.housingService.submitApplication(
      this.applyForm.value.firstName ?? '',
      this.applyForm.value.lastName ?? '',
      this.applyForm.value.email ?? '',
      this.housingLocationId,
    );
  }



}

/*  -ActivatedRoute: Servicio que contiene información sobre la ruta activa.
    -snapshot: Una instantánea del estado de la ruta en el momento de la creación del componente. Se utiliza cuando no se espera que el parámetro cambie mientras el usuario permanece en el mismo componente.
    -params['id']: Acceso al parámetro definido previamente en la configuración de rutas.
    -Una vez obtenido el id, el componente solicita los datos completos al HousingService.
*/
