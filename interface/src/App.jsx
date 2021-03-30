import React from 'react';
import {
    CanvasArea,
    TextInput,
    Generate,
    GalleryView,
    ImagePicker,
} from './components';
import styles from './App.module.scss';
import { Tabs, Tab, TabPane } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { style } from 'd3-selection';

let urls = [
    'images/vg.svg',
    'images/canary_islands.jpg',
    'images/indonesia.jpg',
    'images/la.jpg',
    'images/paris.jpg',
];

let vgs = [
    { src: 'images/visualgroups/3446.jpg', key: 3446 },
    { src: 'images/visualgroups/3447.jpg', key: 3447 },
    // 'images/visualgroups/3448.jpg',
    // 'images/visualgroups/3449.jpg',
    // 'images/visualgroups/3450.jpg',
    // 'images/visualgroups/3451.jpg',
    // 'images/visualgroups/3452.jpg',
    // 'images/visualgroups/3453.jpg',
    // 'images/visualgroups/3454.jpg',
    // 'images/visualgroups/3455.jpg',
];

let layout = [
    { src: 'images/layouts/3456.jpg', key: 3456 },
    // 'images/layouts/3457.jpg',
    // 'images/layouts/3458.jpg',
    // 'images/layouts/3459.jpg',
    // 'images/layouts/3460.jpg',
    // 'images/layouts/3461.jpg',
    // 'images/layouts/3462.jpg',
    // 'images/layouts/3463.jpg',
    // 'images/layouts/3464.jpg',
    // 'images/layouts/3465.jpg',
];

let photos = [
    {
        src: 'images/gallery/3466.jpg',
        width: 1,
        height: 1,
        // key: 3466,
    },
    {
        src: 'images/gallery/3467.jpg',
        width: 1,
        height: 1,
    },
    {
        src: 'images/gallery/3468.jpg',
        width: 1,
        height: 1,
    },
    {
        src: 'images/gallery/3469.jpg',
        width: 1,
        height: 1,
    },
    {
        src: 'images/gallery/3470.jpg',
        width: 1,
        height: 1,
    },
    {
        src: 'images/gallery/3471.jpg',
        width: 1,
        height: 1,
    },
    {
        src: 'images/gallery/3472.jpg',
        width: 1,
        height: 1,
    },
    {
        src: 'images/gallery/3473.jpg',
        width: 1,
        height: 1,
    },
    {
        src: 'images/gallery/3474.jpg',
        width: 1,
        height: 1,
    },
    {
        src: 'images/gallery/3475.jpg',
        width: 1,
        height: 1,
    },
    {
        src: 'images/gallery/3476.jpg',
        width: 1,
        height: 1,
    },
    {
        src: 'images/gallery/3477.jpg',
        width: 1,
        height: 1,
    },
    {
        src: 'images/gallery/3478.jpg',
        width: 1,
        height: 1,
    },
    {
        src: 'images/gallery/3479.jpg',
        width: 1,
        height: 1,
    },
    {
        src: 'images/gallery/3480.jpg',
        width: 1,
        height: 1,
    },
    {
        src: 'images/gallery/3481.jpg',
        width: 1,
        height: 1,
    },
    {
        src: 'images/gallery/3482.jpg',
        width: 1,
        height: 1,
    },
    {
        src: 'images/gallery/3483.jpg',
        width: 1,
        height: 1,
    },
    {
        src: 'images/gallery/3484.jpg',
        width: 1,
        height: 1,
    },
    {
        src: 'images/gallery/3485.jpg',
        width: 1,
        height: 1,
    },
    {
        src: 'images/gallery/3486.jpg',
        width: 1,
        height: 1,
    },
    {
        src: 'images/gallery/3487.jpg',
        width: 1,
        height: 1,
    },
    {
        src: 'images/gallery/3488.jpg',
        width: 1,
        height: 1,
    },
    {
        src: 'images/gallery/3489.jpg',
        width: 1,
        height: 1,
    },
    {
        src: 'images/gallery/3490.jpg',
        width: 1,
        height: 1,
    },
    {
        src: 'images/gallery/3491.jpg',
        width: 1,
        height: 1,
    },
    {
        src: 'images/gallery/3492.jpg',
        width: 1,
        height: 1,
    },
    {
        src: 'images/gallery/3493.jpg',
        width: 1,
        height: 1,
    },
    {
        src: 'images/gallery/3494.jpg',
        width: 1,
        height: 1,
    },
    {
        src: 'images/gallery/3495.jpg',
        width: 1,
        height: 1,
    },
    {
        src: 'images/gallery/3496.jpg',
        width: 1,
        height: 1,
    },
    {
        src: 'images/gallery/3497.jpg',
        width: 1,
        height: 1,
    },
    {
        src: 'images/gallery/3498.jpg',
        width: 1,
        height: 1,
    },
    {
        src: 'images/gallery/3499.jpg',
        width: 1,
        height: 1,
    },
    {
        src: 'images/gallery/3500.jpg',
        width: 1,
        height: 1,
    },
    {
        src: 'images/gallery/3501.jpg',
        width: 1,
        height: 1,
    },
    {
        src: 'images/gallery/3502.jpg',
        width: 1,
        height: 1,
    },
    {
        src: 'images/gallery/3503.jpg',
        width: 1,
        height: 1,
    },
    {
        src: 'images/gallery/3504.jpg',
        width: 1,
        height: 1,
    },
    {
        src: 'images/gallery/3505.jpg',
        width: 1,
        height: 1,
    },
    {
        src: 'images/gallery/3506.jpg',
        width: 1,
        height: 1,
    },
    {
        src: 'images/gallery/3507.jpg',
        width: 1,
        height: 1,
    },
    {
        src: 'images/gallery/3508.jpg',
        width: 1,
        height: 1,
    },
    {
        src: 'images/gallery/3509.jpg',
        width: 1,
        height: 1,
    },
    {
        src: 'images/gallery/3510.jpg',
        width: 1,
        height: 1,
    },
    {
        src: 'images/gallery/3511.jpg',
        width: 1,
        height: 1,
    },
    {
        src: 'images/gallery/3512.jpg',
        width: 1,
        height: 1,
    },
    {
        src: 'images/gallery/3513.jpg',
        width: 1,
        height: 1,
    },
    {
        src: 'images/gallery/3514.jpg',
        width: 1,
        height: 1,
    },
    {
        src: 'images/gallery/3515.jpg',
        width: 1,
        height: 1,
    },
    {
        src: 'images/gallery/3516.jpg',
        width: 1,
        height: 1,
    },
    {
        src: 'images/gallery/3517.jpg',
        width: 1,
        height: 1,
    },
    {
        src: 'images/gallery/3518.jpg',
        width: 1,
        height: 1,
    },
    {
        src: 'images/gallery/3519.jpg',
        width: 1,
        height: 1,
    },
    {
        src: 'images/gallery/3520.jpg',
        width: 1,
        height: 1,
    },
    {
        src: 'images/gallery/3521.jpg',
        width: 1,
        height: 1,
    },
    {
        src: 'images/gallery/3522.jpg',
        width: 1,
        height: 1,
    },
    {
        src: 'images/gallery/3523.jpg',
        width: 1,
        height: 1,
    },
    {
        src: 'images/gallery/3524.jpg',
        width: 1,
        height: 1,
    },
    {
        src: 'images/gallery/3525.jpg',
        width: 1,
        height: 1,
    },
    {
        src: 'images/gallery/3526.jpg',
        width: 1,
        height: 1,
    },
    {
        src: 'images/gallery/3527.jpg',
        width: 1,
        height: 1,
    },
    {
        src: 'images/gallery/3528.jpg',
        width: 1,
        height: 1,
    },
    {
        src: 'images/gallery/3529.jpg',
        width: 1,
        height: 1,
    },
    {
        src: 'images/gallery/3530.jpg',
        width: 1,
        height: 1,
    },
    {
        src: 'images/gallery/3531.jpg',
        width: 1,
        height: 1,
    },
    {
        src: 'images/gallery/3532.jpg',
        width: 1,
        height: 1,
    },
    {
        src: 'images/gallery/3533.jpg',
        width: 1,
        height: 1,
    },
    {
        src: 'images/gallery/3534.jpg',
        width: 1,
        height: 1,
    },
    {
        src: 'images/gallery/3535.jpg',
        width: 1,
        height: 1,
    },
    {
        src: 'images/gallery/3536.jpg',
        width: 1,
        height: 1,
    },
    {
        src: 'images/gallery/3537.jpg',
        width: 1,
        height: 1,
    },
    {
        src: 'images/gallery/3538.jpg',
        width: 1,
        height: 1,
    },
    {
        src: 'images/gallery/3539.jpg',
        width: 1,
        height: 1,
    },
    {
        src: 'images/gallery/3540.jpg',
        width: 1,
        height: 1,
    },
    {
        src: 'images/gallery/3541.jpg',
        width: 1,
        height: 1,
    },
    {
        src: 'images/gallery/3542.jpg',
        width: 1,
        height: 1,
    },
    {
        src: 'images/gallery/3543.jpg',
        width: 1,
        height: 1,
    },
    {
        src: 'images/gallery/3544.jpg',
        width: 1,
        height: 1,
    },
    {
        src: 'images/gallery/3545.jpg',
        width: 1,
        height: 1,
    },
    {
        src: 'images/gallery/3546.jpg',
        width: 1,
        height: 1,
    },
    {
        src: 'images/gallery/3547.jpg',
        width: 1,
        height: 1,
    },
    {
        src: 'images/gallery/3548.jpg',
        width: 1,
        height: 1,
    },
    {
        src: 'images/gallery/3549.jpg',
        width: 1,
        height: 1,
    },
    {
        src: 'images/gallery/3550.jpg',
        width: 1,
        height: 1,
    },
    {
        src: 'images/gallery/3551.jpg',
        width: 1,
        height: 1,
    },
    {
        src: 'images/gallery/3552.jpg',
        width: 1,
        height: 1,
    },
    {
        src: 'images/gallery/3553.jpg',
        width: 1,
        height: 1,
    },
    {
        src: 'images/gallery/3554.jpg',
        width: 1,
        height: 1,
    },
    {
        src: 'images/gallery/3555.jpg',
        width: 1,
        height: 1,
    },
    {
        src: 'images/gallery/3556.jpg',
        width: 1,
        height: 1,
    },
    {
        src: 'images/gallery/3557.jpg',
        width: 1,
        height: 1,
    },
    {
        src: 'images/gallery/3558.jpg',
        width: 1,
        height: 1,
    },
    {
        src: 'images/gallery/3559.jpg',
        width: 1,
        height: 1,
    },
    {
        src: 'images/gallery/3560.jpg',
        width: 1,
        height: 1,
    },
    {
        src: 'images/gallery/3561.jpg',
        width: 1,
        height: 1,
    },
    {
        src: 'images/gallery/3562.jpg',
        width: 1,
        height: 1,
    },
    {
        src: 'images/gallery/3563.jpg',
        width: 1,
        height: 1,
    },
    {
        src: 'images/gallery/3564.jpg',
        width: 1,
        height: 1,
    },
    {
        src: 'images/gallery/3565.jpg',
        width: 1,
        height: 1,
    },
];

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            vg_images: null,
            layout_images: null,
            combine_images: null,
        };
        this.callbackFromChild = this.callbackFromChild.bind(this);
    }

    makeCombinedArray = () => {
        let combine_images = [];
        const { layout_images, vg_images } = this.state;
        if (vg_images !== null && layout_images !== null) {
            vg_images.map((vg_image) => {
                layout_images.map((layout_image) => {
                    combine_images.push(`${vg_image.value}_${layout_image.value}`);
                });
            });
        }
        this.setState({ combine_images });
    };

    callbackFromChild(dataFromChild, type) {
        if (type === 'images') {
            this.setState(dataFromChild, () => this.makeCombinedArray());
        } else {
            this.setState(dataFromChild);
        }
    }
    render() {
        return (
            <Tabs defaultActiveKey="Recommendations" id="tabs">
                <Tab eventKey="View" title="View">
                    <div className={styles.ViewBody}>
                        <Generate imageUrls={urls} />
                    </div>
                </Tab>
                <Tab eventKey="Draw" title="Draw">
                    <div className={styles.AppBody}>
                        <div className={styles.leftContainer}>
                            <CanvasArea />
                        </div>
                        <div className={styles.rightContainer}>
                            <TextInput />
                        </div>
                    </div>
                </Tab>
                <Tab eventKey="Recommendations" title="Recommendations">
                    <div className={styles.recommendationContainer}>
                        <div className={styles.ltContainer}>
                            <ImagePicker
                                type="layout"
                                images={layout}
                                callbackFromChild={this.callbackFromChild}
                            />
                        </div>
                        <div className={styles.vgContainer}>
                            <ImagePicker
                                type="vgs"
                                images={vgs}
                                callbackFromChild={this.callbackFromChild}
                            />
                        </div>
                        <div className={styles.galleryContainer}>
                            <GalleryView
                                photos={photos}
                                combine_images={this.state.combine_images}
                            />
                        </div>
                    </div>
                </Tab>
            </Tabs>
        );
    }
}

export default App;
