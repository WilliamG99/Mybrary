FilePond.registerPlugin(
    FilePondPluginImagePreview,
    FilePondPluginImageResize,
    FilePondPluginFileEncode
);

FilePond.setOptions({
    stylePanelAspectRatio: 150 / 100,
    imageSizeTargetWidth: 150,
    imageSizeTargetHeight: 100
});

FilePond.parse(document.body);