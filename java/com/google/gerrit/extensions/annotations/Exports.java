// Copyright (C) 2012 The Android Open Source Project
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package com.google.gerrit.extensions.annotations;

import com.google.auto.value.AutoAnnotation;

/** Static constructors for {@link Export} annotations. */
public final class Exports {
  /** Create an annotation to export under a specific name. */
  @AutoAnnotation
  public static Export named(String value) {
    return new AutoAnnotation_Exports_named(value);
  }

  /** Create an annotation to export based on a cannonical class name. */
  public static Export named(Class<?> clazz) {
    return named(clazz.getCanonicalName());
  }

  private Exports() {}
}
