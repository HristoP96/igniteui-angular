import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IgxGridComponent, IgxGridCellComponent } from 'igniteui-angular';
import { RemoteService } from '../shared/remote.service';

@Component({
    selector: 'app-grid-selection-sample',
    templateUrl: 'grid-selection.sample.html',
    styleUrls: ['grid-selection.sample.css']
})
export class GridSelectionComponent implements AfterViewInit {

    @ViewChild('grid1')
    grid1: IgxGridComponent;
    remote: Observable<any[]>;
    selection;

    constructor(private remoteService: RemoteService) {
        this.remoteService.urlBuilder = (state) => this.remoteService.url;
     }

    ngAfterViewInit() {
        this.remote = this.remoteService.remoteData;
        this.remoteService.getData(this.grid1.data);
    }

    private onRowSelectionChange(event) {

    }

    private onSelection(event) {

    }

    handleRowSelection(args) {
        const targetCell = args.cell as IgxGridCellComponent;
        if  (!this.selection) {
            this.grid1.selectRows([targetCell.row.rowID], true);
        }
    }

    toggle() {
        const currentSelection = this.grid1.selectedRows();
        if (currentSelection !== undefined) {
            const currentSelectionSet = new Set(currentSelection);
            if (currentSelectionSet.has(1) && currentSelectionSet.has(2) && currentSelectionSet.has(5)) {
                this.grid1.deselectRows([1, 2, 5]);
                return;
            }
        }
        this.grid1.selectRows([1, 2, 5], false);
    }

    toggleAll() {
        if ((this.grid1.selectedRows() || []).length === 0) {
            this.grid1.selectAllRows();
        } else {
            this.grid1.deselectAllRows();
        }
    }

    callSelectAll() {
        this.grid1.selectAllRows();
    }
}
