import {
  Component,
  h,
  Element,
  State,
  Event,
  EventEmitter,
  Host,
  Prop,
} from '@stencil/core';

const MAX_UPLOAD_SIZE = 20000000; // bytes
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
  @Element() public element: HTMLElement;
  @Prop() uploadedFiles: Array<string> = [];
  @State() droppedFiles: Array<string> = [];
  @State() droppedFileNames: Array<string> = [];
  @State() public highlighted: boolean = false;
  @Event() onUploadCompleted: EventEmitter<Blob>;

  componentDidLoad() {
    // Prevent default drag behaviors
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach((eventName) => {
      this.element.addEventListener(eventName, this.preventDefaults, false);
      document.body.addEventListener(eventName, this.preventDefaults, false);
    });

    // // Highlight drop area when item is dragged over it
    ['dragenter', 'dragover'].forEach((eventName) => {
      this.element.addEventListener(
        eventName,
        () => (this.highlighted = true),
        false
      );
    });

    ['dragleave', 'drop'].forEach((eventName) => {
      this.element.addEventListener(
        eventName,
        () => (this.highlighted = false),
        false
      );
    });

    this.element.addEventListener('drop', this.handleDrop, false);
  }

  /**
   *
   * check for file parameter
   *
   */

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

  handleDrop = (e) => {
    var dt = e.dataTransfer;
    var files = dt.files;

    this.handleFiles(files);
  };

  handleFiles = (files) => {
    files = [...files];
    for (let i = 0; i < files.length; i++) {
      if (this.checkFileType(files[i].type)) {
        if (this.checkFileSize(files[i].size)) {
          this.uploadFile(files[i]);
        } else {
          console.error('wrong file size' + files[i].size);
        }
      } else {
        console.error('wrong file type' + files[i].type);
      }
    }
  };

  preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
  }
  /**
   *
   * file upload handling
   *
   */
  public onInputChange(files: FileList) {
    // check if 1 file is uploaded
    if (files.length === 1) {
      const file = files[0];
      if (!this.checkFileSize(file.size)) {
        console.error(
          'Maximum file size exceeded. Max file size is: ' +
            MAX_UPLOAD_SIZE +
            'bytes'
        );
        return false;
      } else if (!this.checkFileType(file.type)) {
        console.error('File type is not allowed');
        return false;
      }
      if (this.checkFileType(file.type)) {
        this.uploadFile(file);
      }
    } else {
      console.error(
        files.length === 0
          ? 'NO IMAGE UPLOADED'
          : 'YOU CAN ONLY UPLOAD ONE IMAGE AT THE TIME'
      );
      return false;
    }
  }
  /**
   *
   * drag and drop file upload handling
   *
   */
  private uploadFile(file) {
    // create a new instance of HTML5 FileReader api to handle uploading
    const reader = new FileReader();

    reader.onloadstart = () => {
      console.log('started uploading');
    };

    reader.onload = () => {
      const fileContainer: HTMLElement = this.element.shadowRoot.querySelector(
        '.dropzone_file_list'
      );
      this.droppedFiles.push(file);
      this.droppedFileNames.push(file.name);
      console.log(this.droppedFiles);
      console.log(this.droppedFileNames);
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

  /**
   *
   * file list visual handling
   *
   */

  handleList() {
    let list = document.createElement('ul');
    list.setAttribute('id', 'dropzone_upload_list');

    for (let i = 0; i < this.droppedFileNames.length; i++) {
      if (this.droppedFileNames[i] != '') {
        let item = document.createElement('li');
        item.setAttribute('class', 'dropzone_upload_list_element');
        item.appendChild(document.createTextNode(this.droppedFileNames[i]));
        let closeButton = document.createElement('button');
        closeButton.onclick = () => {
          this.handleButtonClicked(closeButton.id);
        };
        closeButton.setAttribute('id', `button_${i}`);
        closeButton.setAttribute('class', 'dropzone_delete_button');
        item.appendChild(closeButton);
        list.appendChild(item);
      }
    }
    return list;
  }
  /**
   *
   * button handling
   *
   */
  handleButtonClicked(id: string) {
    const position = id.match(/\d+$/)[0];
    this.droppedFileNames.splice(parseInt(position), 1, '');
    this.droppedFiles.splice(parseInt(position), 1, '');
    console.log(this.droppedFileNames);
    console.log(this.droppedFiles);
    const fileContainer: HTMLElement = this.element.shadowRoot.querySelector(
      '.dropzone_file_list'
    );
    const button: HTMLElement = this.element.shadowRoot.querySelector(`#${id}`);
    button.outerHTML = '';
    fileContainer.innerHTML = '';
    fileContainer.append(this.handleList());
  }

  handleUploadButtonClick() {
    let uploaded: Array<string> = [];
    for (let i = 0; i < this.droppedFiles.length; i++) {
      if (this.droppedFiles[i] != '') {
        uploaded.push(this.droppedFiles[i]);
      }
    }
    console.log(uploaded);
    this.uploadedFiles = uploaded;
  }

  render() {
    return (
      <Host>
        <div class="dropzone">
          <label class="dropzone_clickarea" htmlFor="fileElem">
            <form class={{ highlight: this.highlighted }}>
              <input
                type="file"
                name="files[]"
                id="fileElem"
                class="dropzone_upload_input"
                onChange={($event: any) =>
                  this.onInputChange($event.target.files)
                }
              />
              <img
                class="dropzone_image"
                src="https://img.icons8.com/android/24/000000/upload.png"
              />
              <p class="dropzone_title">
                Click or drag to select file for upload
              </p>
              <p class="dropzone_subtitle">20 mb maximum tile size.</p>
            </form>
          </label>
        </div>
        <div class="dropzone_file_list"></div>
        <scale-button onClick={() => this.handleUploadButtonClick()}>
          Upload
        </scale-button>
      </Host>
    );
  }
}
