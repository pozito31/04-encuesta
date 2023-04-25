import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { WebsocketService } from '../../services/websocket.service';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.css'],
})
export class EncuestaComponent implements OnInit {
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
  };

  public barChartData: any[] = [
    { data: [65, 59, 80, 81], label: 'Entrevistados' },
  ];

  public barChartLabels: string[] = [
    'Pregunta 1',
    'Pregunta 2',
    'Pregunta 3',
    'Pregunta 4',
  ];

  public barChartType: ChartType = 'bar';

  constructor(private http: HttpClient, public wsService: WebsocketService) {}

  ngOnInit() {
    this.escucharSocket();
    this.getData();
  }

  getData() {
    this.http.get('http://localhost:5000/encuesta').subscribe((data: any) => {
      this.barChartData = data;
    });
  }

  escucharSocket() {
    this.wsService.listen('cambio-encuesta').subscribe((data: any) => {
      console.log('socket', data);
      this.barChartData = data;
    });
  }
}
