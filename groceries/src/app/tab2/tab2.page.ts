import { Component } from '@angular/core';
import { NavController, ToastController, AlertController } from '@ionic/angular';
import { SocialSharingService } from '../services/social-sharing-service.service';
import { GroceriesService } from '../services/groceries-service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  title = "Grocery"
  public alertButtons = ['Add', 'Cancel'];
  public alertInputs = [{placeholder: 'Name'}, {placeholder: 'Quantity'}];
  items = [
    { name: "Milk", quantity: 2 },
    { name: "Eggs", quantity: 3 },
    { name: "Bread", quantity: 2 },
    { name: "Cereal", quantity: 1 },
  ];

  constructor(
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private socialSharingService: SocialSharingService,
    public dataService: GroceriesService
  ) {}

  async removeItem(item, i) {
    console.log("Removing item");
    // ...existing toast and splice logic
    this.dataService.removeItem(i).subscribe(
      () => console.log('Item removed successfully.'),
      (error) => console.error('Error removing item', error)
    );
  }

  async shareItem(item, i) {
    console.log("Sharing item");
    // ...existing toast logic
    // ...existing social sharing logic
  }

  async editItem(item, i) {
    console.log("Editing item");
    // ...existing toast logic
    this.showEditItemPrompt(item, i);
  }

  async addItem() {
    console.log("Adding item");
    this.showAddItemPrompt();
  }

  async showAddItemPrompt() {
    const prompt = await this.alertCtrl.create({
      header: 'Add Item',
      message: "Enter an item to add",
      inputs: [
        {
          name: 'name',
          placeholder: 'Name'
        },
        {
          name: 'quantity',
          placeholder: 'Quantity'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Canceling item');
          }
        },
        {
          text: 'Save',
          handler: (item) => {
            console.log('Adding item', item);
            this.dataService.addItem(item).subscribe(
              () => {
                console.log('Item added successfully.');
                this.items.push(item);
              },
              (error) => console.error('Error adding item', error)
            );
          },
        },
      ]
    });
    await prompt.present();
  }

  async showEditItemPrompt(item, index) {
    const prompt = await this.alertCtrl.create({
      header: 'Edit Item',
      message: "Enter an item to edit",
      inputs: [
        {
          name: 'name',
          placeholder: 'Name',
          value: item.name
        },
        {
          name: 'quantity',
          placeholder: 'Quantity',
          value: item.quantity
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Canceling item');
          }
        },
        {
          text: 'Save',
          handler: (editedItem) => {
            console.log('Editing item', editedItem);
            this.dataService.editItem(index, editedItem).subscribe(
              () => {
                console.log('Item edited successfully.');
                this.items[index] = editedItem;
              },
              (error) => console.error('Error editing item', error)
            );
          },
        },
      ]
    });
    await prompt.present();
  }
}
