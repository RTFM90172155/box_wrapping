var wrappingsFile = null;
var contentsFile = null;
var blobType = null;
var blobName = null;

document.getElementById("wrappingsInput").addEventListener('change', function(e) {
  var file = e.target.files[0];
  if (file != null) {
    if (file.type.match(/image\/.+/)) {
      var reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onloadend = function(e) {
        if (e.target.readyState == FileReader.DONE) {
          wrappingsFile = e.target.result;
          blobType = file.type;
          blobName = file.name;
          var selectedName = file.name + "(" + file.size.toLocaleString() + "bytes)";
          document.getElementById("wrappingsSelected").innerText = selectedName;
        }
      };
    } else {
      alert("포장지는 이미지 파일만 선택 가능합니다.");
    }
  }
});

document.getElementById("contentsInput").addEventListener('change', function(e) {
  var file = e.target.files[0];
  if (file != null) {
    var reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = function(e) {
      if (e.target.readyState == FileReader.DONE) {
        contentsFile = e.target.result;
        var selectedName = file.name + "(" + file.size.toLocaleString() + "bytes)";
        document.getElementById("contentsSelected").innerText = selectedName;
      }
    };
  }
});

document.getElementById("downloadButton").addEventListener('click', function() {
  if (wrappingsFile != null && contentsFile != null) {
    var downloadName = "wrapped_" + blobName;
    var blob = new Blob([wrappingsFile, contentsFile], {type: blobType});
    var msg = "성공적으로 포장되었습니다.\n" + downloadName + 
              "(" + blob.size.toLocaleString() + "bytes)를 다운받으시겠습니까?";
    if (confirm(msg) == true) {
      var url = window.URL.createObjectURL(blob);
      var a = document.createElement("a");
      a.href = url;
      a.download = downloadName;
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    }
  } else if (wrappingsFile == null) {
    alert("포장지가 선택되지 않았습니다.");
  } else {
    alert("내용물이 선택되지 않았습니다.");
  }
});

document.getElementById("wrappingsInput").addEventListener('dragenter', function(e) {
  document.getElementById("wrappingsInputLabel").classList.add("dragged");
});
document.getElementById("wrappingsInput").addEventListener('dragleave', function(e) {
  document.getElementById("wrappingsInputLabel").classList.remove("dragged");
});
document.getElementById("wrappingsInput").addEventListener('drop', function(e) {
  document.getElementById("wrappingsInputLabel").classList.remove("dragged");
});
document.getElementById("contentsInput").addEventListener('dragenter', function(e) {
  document.getElementById("contentsInputLabel").classList.add("dragged");
});
document.getElementById("contentsInput").addEventListener('dragleave', function(e) {
  document.getElementById("contentsInputLabel").classList.remove("dragged");
});
document.getElementById("contentsInput").addEventListener('drop', function(e) {
  document.getElementById("contentsInputLabel").classList.remove("dragged");
});
