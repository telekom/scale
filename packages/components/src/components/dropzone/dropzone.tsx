import {
  Component,
  h,
  Element,
  State,
  Event,
  EventEmitter,
  Host,
} from '@stencil/core';

const MAX_UPLOAD_SIZE = 3000000; // bytes
const ALLOWED_FILE_TYPES = [
  'image/jpeg',
  'image/png',
  'application/x-webarchive',
  'application/zip',
];

@Component({
  tag: 'scale-dropzone',
  styleUrl: 'dropzone.css',
  shadow: true,
})
export class Dropzone {
  @Element() public dropArea: HTMLElement;
  @State() uploadedFiles: Array<string> = [];
  @State() uploadedFilesNames: Array<string> = [];
  @State() public highlighted: boolean = false;
  @Event() onUploadCompleted: EventEmitter<Blob>;

  componentDidLoad() {
    // Prevent default drag behaviors
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach((eventName) => {
      this.dropArea.addEventListener(eventName, this.preventDefaults, false);
      document.body.addEventListener(eventName, this.preventDefaults, false);
    });

    // // Highlight drop area when item is dragged over it
    ['dragenter', 'dragover'].forEach((eventName) => {
      this.dropArea.addEventListener(
        eventName,
        () => (this.highlighted = true),
        false
      );
    });

    ['dragleave', 'drop'].forEach((eventName) => {
      this.dropArea.addEventListener(
        eventName,
        () => (this.highlighted = false),
        false
      );
    });

    this.dropArea.addEventListener('drop', this.handleDrop, false);
  }

  handleDrop = (e) => {
    var dt = e.dataTransfer;
    var files = dt.files;

    this.handleFiles(files);
  };

  handleFiles = (files) => {
    files = [...files];
    console.log('handleFiles()');
    console.log(files);
    this.uploadedFiles.push(files);
    console.log(this.uploadedFiles);

    for (let i = 0; i < files.length; i++) {
      this.uploadFile(files[i]);
    }
  };

  preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  public onInputChange(files: FileList) {
    // check if 1 file is uploaded
    if (files.length === 1) {
      const file = files[0];
      console.log('onInputChange()');
      console.log(file);
      // check if the user isn't trying to upload a file larger then the MAX_UPLOAD_SIZE
      if (!this.checkFileSize(file.size)) {
        console.error(
          'Maximum file size exceeded. Max file size is: ' +
            MAX_UPLOAD_SIZE +
            'bytes'
        );
        return false;
      }
      // check if the user isn't trying to upload anything else then an image
      else if (!this.checkFileType(file.type)) {
        console.error('File type is not allowed');
        return false;
      }

      // upload image
      this.uploadFile(file);
    } else {
      console.error(
        files.length === 0
          ? 'NO IMAGE UPLOADED'
          : 'YOU CAN ONLY UPLOAD ONE IMAGE AT THE TIME'
      );
      return false;
    }
  }
  private uploadFile(file) {
    // create a new instance of HTML5 FileReader api to handle uploading
    const reader = new FileReader();

    reader.onloadstart = () => {
      console.log('started uploading');
    };

    reader.onload = () => {
      const fileContainer: HTMLElement = this.dropArea.shadowRoot.querySelector(
        '#file_list'
      );

      this.uploadedFilesNames.push(file.name);
      console.log(this.uploadedFilesNames);
      fileContainer.innerHTML = '';
      fileContainer.append(this.handleList());

      console.log(
        'uploading finished, emitting an image blob to the outside world'
      );
      this.onUploadCompleted.emit(file);
    };

    reader.onloadend = () => {
      console.log('upload finished');
    };

    reader.onerror = (err) => {
      console.error('something went wrong...', err);
    };
    reader.readAsDataURL(file);
  }

  handleList() {
    let list = document.createElement('ul');

    list.setAttribute('id', 'uploadList');

    for (let i = 0; i < this.uploadedFilesNames.length; i++) {
      if (this.uploadedFilesNames[i] != '') {
        let item = document.createElement('li');

        item.appendChild(document.createTextNode(this.uploadedFilesNames[i]));
        let button = document.createElement('scale-button');
        button.onclick = () => {
          this.handleButtonClicked(button.id);
        };
        button.setAttribute('id', `button_${i}`);
        item.appendChild(button);
        list.appendChild(item);
      }
    }
    console.log('here');
    console.log(list);
    return list;
  }

  handleButtonClicked(id: string) {
    console.log('clicked button' + id);
    const position = id.match(/\d+$/)[0];
    this.uploadedFilesNames.splice(parseInt(position), 1, '');
    const fileContainer: HTMLElement = this.dropArea.shadowRoot.querySelector(
      '#file_list'
    );
    const button: HTMLElement = this.dropArea.shadowRoot.querySelector(
      `#${id}`
    );
    button.outerHTML = '';
    console.log(this.uploadedFilesNames);
    fileContainer.innerHTML = '';
    fileContainer.append(this.handleList());

    console.log(this.uploadedFilesNames);
  }

  private checkFileSize(size: number): boolean {
    return size <= MAX_UPLOAD_SIZE;
  }

  private checkFileType(type: string): boolean {
    for (let i = 0; i < ALLOWED_FILE_TYPES.length; i++) {
      let file_checker = ALLOWED_FILE_TYPES[i];
      if (type === file_checker) {
        return true;
      }
    }
    return false;
  }

  render() {
    return (
      <Host>
        <div id="drop-area">
          <form class={{ highlight: this.highlighted }}>
            <input
              type="file"
              name="files[]"
              id="fileElem"
              class="upload__input"
              onChange={($event: any) =>
                this.onInputChange($event.target.files)
              }
            />
            <label class="button retry" htmlFor="fileElem">
              <img src="https://img.icons8.com/android/24/000000/upload.png" />
            </label>
            <p class="dropzone-title">
              Click or drag to select file for upload
            </p>
            <p class="dropzone-subtitle">20 mb maximum tile size.</p>
          </form>
        </div>
        <div id="file_list" class="file_list"></div>
      </Host>
    );
  }
}
